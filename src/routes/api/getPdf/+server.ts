


import type { RequestHandler } from '@sveltejs/kit';
import { generatePdf } from '$lib/drawPdf';

export const GET: RequestHandler = async ({ url }) => {
    const userId = Number(url.searchParams.get('userId'));
    if (!userId) {
        return new Response('User ID is required', { status: 400 });
    }

    try {
        console.log(`Generating PDF for user ${userId}`);
        const pdfBytes = await generatePdf(userId);
        console.log(`Successfully generated PDF for user ${userId}`);
        return new Response(pdfBytes, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="cv-${userId}.pdf"`
            }
        });
    } catch (error) {
        console.error(`Failed to generate PDF for user ${userId}:`, error);
        return new Response('Failed to generate PDF', { status: 500 });
    }
};
