<script lang="ts">
    import { jsPDF } from "jspdf";
  
    let invoiceDiv: HTMLDivElement;
  
    async function generatePDFusingJsPdf() {
      try {
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'px',
          format: "a4",
        });
       
        pdf.html(invoiceDiv, {
          autoPaging: "text",
          callback: function (doc) {
            doc.save("invoice.pdf");
          },
         margin: 10,
         html2canvas: {
            scale: 0.35,
            windowWidth: pdf.internal.pageSize.width - 10,
            width: pdf.internal.pageSize.width,
            useCORS: true,
           
          },
          
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
 
  </script>
  
  
  <div id="editor"></div>
  <button id="cmd" on:click={generatePDFusingJsPdf}
    >Generate PDF with jsPDF</button
  >
 
  <div id="invoice" bind:this={invoiceDiv}>
    <div class="container">
      <div class="left-column">
          <img src="profile-pic.jpg" alt="Profile Picture" class="profile-pic">
          <div class="education section-content">
              <h2 class="section-title">Education</h2>
              <p>Master's Degree in Computer Science</p>
              <p>University of XYZ, 2016 - 2018</p>
              <p>Bachelor's Degree in Information Technology</p>
              <p>University of ABC, 2012 - 2016</p>
          </div>
          <div class="skills section-content">
              <h2 class="section-title">Skills</h2>
              <ul>
                  <li>JavaScript</li>
                  <li>Python</li>
                  <li>HTML & CSS</li>
                  <li>React</li>
                  <li>Node.js</li>
                  <li>Angular</li>
                  <li>SQL</li>
                  <li>NoSQL Databases</li>
                  <li>Version Control (Git)</li>
                  <li>RESTful APIs</li>
                  <li>GraphQL</li>
                  <li>Agile Methodologies</li>
                  <li>Docker</li>
                  <li>CI/CD</li>
                  <li>Unit Testing</li>
                  <li>Cloud Services (AWS, Azure)</li>
                  <li>Microservices Architecture</li>
              </ul>
          </div>
          <div class="interpersonal-skills section-content">
              <h2 class="section-title">Interpersonal Skills</h2>
              <ul>
                  <li>Effective Communication</li>
                  <li>Team Collaboration</li>
                  <li>Problem Solving</li>
                  <li>Adaptability</li>
                  <li>Time Management</li>
                  <li>Critical Thinking</li>
                  <li>Conflict Resolution</li>
                  <li>Leadership</li>
                  <li>Empathy</li>
                  <li>Active Listening</li>
                  <li>Decision Making</li>
                  <li>Networking</li>
                  <li>Negotiation</li>
                  <li>Mentoring</li>
                  <li>Creativity</li>
                  <li>Project Management</li>
                  <li>Stress Management</li>
              </ul>
          </div>
          <div class="certifications section-content">
              <h2 class="section-title">Certifications</h2>
              <ul>
                  <li>Certified JavaScript Developer</li>
                  <li>Python Programming Certification</li>
                  <li>HTML & CSS Specialist</li>
                  <li>React Professional Certification</li>
                  <li>Node.js Certified Developer</li>
                  <li>Angular Certification</li>
                  <li>SQL Database Certification</li>
                  <li>NoSQL Database Specialist</li>
                  <li>Certified Git User</li>
                  <li>RESTful API Certification</li>
                  <li>GraphQL Certification</li>
                  <li>Agile Methodologies Certification</li>
                  <li>Docker Certified Associate</li>
                  <li>CI/CD Pipeline Certification</li>
                  <li>Unit Testing Certification</li>
                  <li>Cloud Practitioner (AWS, Azure)</li>
                  <li>Microservices Architecture Certification</li>
              </ul>
          </div>
          
          <div class="memberships section-content">
              <h2 class="section-title">Memberships</h2>
              <ul>
                  <li>Member of the Association for Computing Machinery (ACM)</li>
                  <li>Member of the Institute of Electrical and Electronics Engineers (IEEE)</li>
                  <li>Member of the International Association of Software Architects (IASA)</li>
                  <li>Member of the Agile Alliance</li>
                  <li>Member of the Cloud Native Computing Foundation (CNCF)</li>
                  <li>Member of the Project Management Institute (PMI)</li>
              </ul>
          </div>
          
      </div>
      <div class="right-column">
          <div class="profile-summary section-content">
              <h2 class="section-title">Profile Summary</h2>
              <p>Experienced web developer with a strong background in developing award-winning applications for a diverse clientele. Skilled in front-end and back-end development, and knowledgeable in various programming languages.</p>
          </div>
          <div class="experience section-content">
              <h2 class="section-title">Work Experience</h2>
              <h3>Senior Web Developer</h3>
              <p>XYZ Company, 2019 - Present</p>
              <ul>
                  <li>Developed and maintained company website and applications.</li>
                  <li>Led a team of junior developers.</li>
                  <li>Collaborated with designers to create user-friendly interfaces.</li>
                  <li>Optimized applications for maximum speed and scalability.</li>
                  <li>Implemented security and data protection measures.</li>
                  <li>Monitored and improved system performance.</li>
              </ul>
              <h3>Web Developer</h3>
              <p>ABC Company, 2016 - 2019</p>
              <ul>
                  <li>Built and optimized user interfaces.</li>
                  <li>Implemented responsive web design.</li>
                  <li>Worked closely with clients to gather requirements and feedback.</li>
                  <li>Integrated third-party APIs.</li>
                  <li>Maintained and updated website content.</li>
                  <li>Collaborated with back-end developers to enhance website functionality.</li>
              </ul>
              <h3>Junior Web Developer</h3>
              <p>123 Tech, 2014 - 2016</p>
              <ul>
                  <li>Assisted in the development of web applications.</li>
                  <li>Tested and debugged software applications.</li>
                  <li>Supported senior developers in project tasks.</li>
                  <li>Participated in code reviews.</li>
                  <li>Wrote technical documentation.</li>
                  <li>Learned and applied new technologies as needed.</li>
              </ul>
              <h3>Junior Web Developer</h3>
              <p>123 Tech, 2014 - 2016</p>
              <ul>
                  <li>Assisted in the development of web applications.</li>
                  <li>Tested and debugged software applications.</li>
                  <li>Supported senior developers in project tasks.</li>
                  <li>Participated in code reviews.</li>
                  <li>Wrote technical documentation.</li>
                  <li>Learned and applied new technologies as needed.</li>
              </ul><h3>Junior Web Developer</h3>
              <p>123 Tech, 2014 - 2016</p>
              <ul>
                  <li>Assisted in the development of web applications.</li>
                  <li>Tested and debugged software applications.</li>
                  <li>Supported senior developers in project tasks.</li>
                  <li>Participated in code reviews.</li>
                  <li>Wrote technical documentation.</li>
                  <li>Learned and applied new technologies as needed.</li>
              </ul>
          </div>
          <div class="experience section-content">
              <h2 class="section-title">Projects</h2>
              <h3>Project A</h3>
              <p>Description of Project A.</p>
              <ul>
                  <li>Role and contributions in Project A.</li>
                  <li>Technologies used in Project A.</li>
              </ul>
              <h3>Project B</h3>
              <p>Description of Project B.</p>
              <ul>
                  <li>Role and contributions in Project B.</li>
                  <li>Technologies used in Project B.</li>
              </ul>
              <h3>Project C</h3>
              <p>Description of Project C.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul>
              <h3>Project C</h3>
              <p>Description of Project C.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul><h3>Project D</h3>
              <p>Description of Project D.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul><h3>Project E</h3>
              <p>Description of Project E.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul><h3>Project F</h3>
              <p>Description of Project F.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul><h3>Project G</h3>
              <p>Description of Project G.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul><h3>Project H</h3>
              <p>Description of Project H.</p>
              <ul>
                  <li>Role and contributions in Project C.</li>
                  <li>Technologies used in Project C.</li>
              </ul>
          </div>
      </div>
  </div>
  </div>
  
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f4f4f4;
          text-wrap: wrap;
      }
      .container {
          width: 80%;
          background-color: #fff;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
          display: flex;
          flex-direction: row;
      }
      .left-column {
          width: 33%;
          background-color: #333;
          color: #fff;
          padding: 20px;
      }
      .right-column {
          width: 67%;
          padding: 20px;
      }
      .profile-pic {
          width: 100%;
          height: auto;
          border-radius: 50%;
          margin-bottom: 20px;
      }
      .section-title {
          font-size: 1.5em;
          margin-bottom: 10px;
          border-bottom: 2px solid #333;
          padding-bottom: 5px;
      }
      .section-content {
          margin-bottom: 20px;
      }
      .education, .skills, .experience, .profile-summary {
          margin-bottom: 20px;
      }
      .skill-item {
          margin-bottom: 5px;
      }
  </style>