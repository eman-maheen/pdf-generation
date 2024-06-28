import { jsPDF } from 'jspdf';
import { pool } from '$lib/db';
import fs from 'fs';

const PAGE_MARGIN = 10;
const HEADING_FONT_SIZE = 16;
const CONTENT_FONT_SIZE = 12;
const LINE_SPACE_AFTER_HEADING = 5;
const LINE_SPACE_AFTER_SECTION = 10;
const COLUMN_GAP = 5;
const LINE_HEIGHT = 5;

async function fetchCvData(userId: number): Promise<any> {
    const res = await pool.query('SELECT cv_data FROM cvs WHERE user_id = $1', [userId]);
    return res.rows[0]?.cv_data;
}

export async function generatePdf(userId: number): Promise<Uint8Array> {
    const cvData = await fetchCvData(userId);

    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4'
    });

    const PROFILE_PIC_WIDTH = 50;
    const PROFILE_PIC_HEIGHT = 50;
    const PROFILE_PIC_PATH = `static/images/${cvData.profile_picture}`;


    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftColumnWidth = (pageWidth / 3) - 2 * PAGE_MARGIN;
    const rightColumnWidth = (pageWidth * 2 / 3) - 2 * PAGE_MARGIN;

    let yLeft = PAGE_MARGIN;
    let yRight = PAGE_MARGIN;
    let currentPage = 1;

    const addPageIfNeeded = () => {
        const maxHeight = Math.max(yLeft, yRight);
        if (maxHeight > pageHeight) {
            doc.addPage();
            currentPage++;
            yLeft = PAGE_MARGIN;
            yRight = PAGE_MARGIN;
        }
    };

    const printLeftColumnText = (text: string | Record<string, any>, x: number, maxWidth: number, isBold: boolean = false): number => {
        setFontStyle(isBold);

        let lines: string[] = [];
        if (typeof text === 'string') {
            lines = doc.splitTextToSize(text, maxWidth);
        } else if (typeof text === 'object') {
            lines = Object.values(text).flatMap((value: string) => doc.splitTextToSize(value, maxWidth));
        }

        lines.forEach((line: string, index: number) => {
            if (index > 0) {
                yLeft += LINE_HEIGHT;
            }
            doc.text(line, x, yLeft);
        });

        return yLeft;
    };

    const printRightColumnText = (text: string, x: number, maxWidth: number, isBold: boolean = false): number => {
        setFontStyle(isBold);

        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
            doc.text(line, x, yRight);
            yRight += LINE_HEIGHT;
        });

        return yRight;
    };

    const setFontStyle = (isBold: boolean) => {
        doc.setFont("Arial", isBold ? 'bold' : 'normal');
    };


    const printProjects = (projects: { name: string; description: string; contributions: string[] }[], x: number, maxWidth: number) => {
        projects.forEach((project) => {
            yRight = printRightColumnText(`${project.name}`, x, maxWidth, true);
            yRight += LINE_SPACE_AFTER_HEADING;
            yRight = printRightColumnText(`${project.description}`, x, maxWidth);

            if (project.contributions && project.contributions.length > 0) {
                project.contributions.forEach((contribution) => {
                    yRight = printRightColumnText(`- ${contribution}`, x, maxWidth);

                });
            }

            yRight += LINE_SPACE_AFTER_SECTION;
            checkPageOverflow();
        });
    };

    const checkPageOverflow = () => {
        if (Math.max(yLeft, yRight) > pageHeight) {
            doc.addPage();
            yLeft = PAGE_MARGIN;
            yRight = PAGE_MARGIN;
        }
    };

    const addContentSimultaneously = () => {
        doc.setFontSize(CONTENT_FONT_SIZE);

        const leftColumnContent = [
            { image: PROFILE_PIC_PATH },
            { heading: "Education", data: cvData.education },
            { heading: "Skills", data: cvData.skills },
            { heading: "Interpersonal Skills", data: cvData.interpersonal_skills },
            { heading: "Certifications", data: cvData.certifications },
            { heading: "Memberships", data: cvData.memberships }
        ];

        const rightColumnContent = [
            { heading: "Profile Summary", data: cvData.profile_summary },
            { heading: "Work Experience", data: cvData.work_experience },
            { heading: "Projects", data: cvData.projects }
        ];

        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < leftColumnContent.length || rightIndex < rightColumnContent.length) {
            // Add content to left column
            if (leftIndex < leftColumnContent.length) {
                const leftItem = leftColumnContent[leftIndex];
                if (leftItem.image) {
                    const profilePicData = fs.readFileSync(leftItem.image).toString('base64');
                    doc.addImage(profilePicData, 'JPEG', PAGE_MARGIN, yLeft, PROFILE_PIC_WIDTH, PROFILE_PIC_HEIGHT);
                    yLeft += PROFILE_PIC_HEIGHT + LINE_SPACE_AFTER_SECTION;
                    checkPageOverflow();
                } else if (leftItem.heading && leftItem.data) {
                    doc.setFontSize(HEADING_FONT_SIZE);
                    yLeft = printLeftColumnText(leftItem.heading, PAGE_MARGIN, leftColumnWidth, true);
                    doc.setFontSize(CONTENT_FONT_SIZE);
                    yLeft += LINE_SPACE_AFTER_SECTION;

                    if (Array.isArray(leftItem.data)) {
                        leftItem.data.forEach((item: any) => {
                            yLeft = printLeftColumnText(item, PAGE_MARGIN, leftColumnWidth);
                            yLeft += LINE_HEIGHT;
                            checkPageOverflow();
                        });
                    } else {
                        yLeft = printLeftColumnText(leftItem.data, PAGE_MARGIN, leftColumnWidth);
                        checkPageOverflow();
                    }
                }
                leftIndex++;
                yLeft += LINE_SPACE_AFTER_SECTION;

            }

            // Add content to right column
            if (rightIndex < rightColumnContent.length) {
                const rightItem = rightColumnContent[rightIndex];
                if (rightItem.heading && rightItem.data) {
                    doc.setFontSize(HEADING_FONT_SIZE);
                    yRight = printRightColumnText(rightItem.heading, pageWidth / 3 + COLUMN_GAP, rightColumnWidth, true);
                    yRight += LINE_SPACE_AFTER_HEADING;
                    doc.setFontSize(CONTENT_FONT_SIZE);

                    if (rightItem.data === cvData.projects) {
                        printProjects(rightItem.data, pageWidth / 3 + COLUMN_GAP, rightColumnWidth);
                    } else if (Array.isArray(rightItem.data)) {
                        rightItem.data.forEach((item: any) => {
                            if (typeof item === 'object') {
                                // Print details for Work Experience and other similar sections
                                for (const key in item) {
                                    if (item.hasOwnProperty(key)) {
                                        yRight = printRightColumnText(`${item[key]}`, pageWidth / 3 + COLUMN_GAP, rightColumnWidth);
                                    }
                                }
                            } else {
                                yRight = printRightColumnText(item, pageWidth / 3 + COLUMN_GAP, rightColumnWidth);
                            }
                            yRight += LINE_SPACE_AFTER_SECTION;
                            checkPageOverflow();
                        });
                    } else {
                        yRight = printRightColumnText(rightItem.data, pageWidth / 3 + COLUMN_GAP, rightColumnWidth);
                        yRight += LINE_SPACE_AFTER_SECTION;
                        checkPageOverflow();
                    }
                }
                rightIndex++;
            }

            addPageIfNeeded();
        }
    };

    addContentSimultaneously();

    const pdfBytes = doc.output('arraybuffer');
    return new Uint8Array(pdfBytes);
}