CREATE TABLE cvs (
    user_id INT PRIMARY KEY,
    cv_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO cvs (user_id, cv_data) VALUES 
(1, $${
    "profile_summary": "Experienced web developer with a strong background...",
    "profile_picture": "profile-pic.jpg",
    "work_experience": [
        {"position": "Senior Web Developer", "company": "XYZ Company", "duration": "2019 - Present", "responsibilities": ["Developed and maintained company website and applications.", "Led a team of junior developers.", "Collaborated with designers to create user-friendly interfaces.", "Optimized applications for maximum speed and scalability.", "Implemented security and data protection measures.", "Monitored and improved system performance."]},
        {"position": "Web Developer", "company": "ABC Company", "duration": "2016 - 2019", "responsibilities": ["Built and optimized user interfaces.", "Implemented responsive web design.", "Worked closely with clients to gather requirements and feedback.", "Integrated third-party APIs.", "Maintained and updated website content.", "Collaborated with back-end developers to enhance website functionality."]},
        {"position": "Junior Web Developer", "company": "123 Tech", "duration": "2014 - 2016", "responsibilities": ["Assisted in the development of web applications.", "Tested and debugged software applications.", "Supported senior developers in project tasks.", "Participated in code reviews.", "Wrote technical documentation.", "Learned and applied new technologies as needed."]}
    ],
    "education": [
        {"degree": "Master's Degree in Computer Science", "institution": "University of XYZ", "duration": "2016 - 2018"},
        {"degree": "Bachelor's Degree in Information Technology", "institution": "University of ABC", "duration": "2012 - 2016"}
    ],
    "skills": ["JavaScript", "Python", "HTML & CSS", "React", "Node.js", "Angular", "SQL", "NoSQL Databases", "Version Control (Git)", "RESTful APIs", "GraphQL", "Agile Methodologies", "Docker", "CI/CD", "Unit Testing", "Cloud Services (AWS, Azure)", "Microservices Architecture"],
    "interpersonal_skills": ["Effective Communication", "Team Collaboration", "Problem Solving", "Adaptability", "Time Management", "Critical Thinking", "Conflict Resolution", "Leadership", "Empathy", "Active Listening", "Decision Making", "Networking", "Negotiation", "Mentoring", "Creativity", "Project Management", "Stress Management"],
    "certifications": ["Certified JavaScript Developer", "Python Programming Certification", "HTML & CSS Specialist", "React Professional Certification", "Node.js Certified Developer", "Angular Certification", "SQL Database Certification", "NoSQL Database Specialist", "Certified Git User", "RESTful API Certification", "GraphQL Certification", "Agile Methodologies Certification", "Docker Certified Associate", "CI/CD Pipeline Certification", "Unit Testing Certification", "Cloud Practitioner (AWS, Azure)", "Microservices Architecture Certification"],
    "memberships": ["Member of the Association for Computing Machinery (ACM)", "Member of the Institute of Electrical and Electronics Engineers (IEEE)", "Member of the International Association of Software Architects (IASA)", "Member of the Agile Alliance", "Member of the Cloud Native Computing Foundation (CNCF)", "Member of the Project Management Institute (PMI)"],
    "projects": [
        {"name": "Project A", "description": "Description of Project A.", "contributions": ["Role and contributions in Project A.", "Technologies used in Project A."]},
        {"name": "Project B", "description": "Description of Project B.", "contributions": ["Role and contributions in Project B.", "Technologies used in Project B."]},
        {"name": "Project C", "description": "Description of Project C.", "contributions": ["Role and contributions in Project C.", "Technologies used in Project C."]},
        {"name": "Project D", "description": "Description of Project D.", "contributions": ["Role and contributions in Project D.", "Technologies used in Project D."]},
        {"name": "Project E", "description": "Description of Project E.", "contributions": ["Role and contributions in Project E.", "Technologies used in Project E."]}
    ]
}$$);

INSERT INTO cvs (user_id, cv_data) VALUES 
(2, $${
    "profile_summary": "Detail-oriented software engineer with expertise in full-stack development...",
    "profile_picture": "profile-pic2.jpg",
    "work_experience": [
        {"position": "Full Stack Developer", "company": "Tech Solutions", "duration": "2020 - Present", "responsibilities": ["Developed and maintained web applications.", "Worked on both front-end and back-end systems.", "Collaborated with cross-functional teams.", "Ensured the scalability and security of applications."]},
        {"position": "Backend Developer", "company": "Innovative Systems", "duration": "2017 - 2020", "responsibilities": ["Designed and implemented server-side logic.", "Managed database schemas.", "Integrated third-party services.", "Improved application performance."]}
    ],
    "education": [
        {"degree": "Bachelor's Degree in Computer Engineering", "institution": "University of DEF", "duration": "2013 - 2017"}
    ],
    "skills": ["JavaScript", "Python", "Django", "React", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    "interpersonal_skills": ["Problem Solving", "Team Collaboration", "Effective Communication"],
    "certifications": ["AWS Certified Developer", "Docker Certified Associate"],
    "memberships": ["Member of the Linux Foundation", "Member of the Cloud Native Computing Foundation (CNCF)"],
    "projects": [
        {"name": "Project X", "description": "Description of Project X.", "contributions": ["Role and contributions in Project X.", "Technologies used in Project X."]},
        {"name": "Project Y", "description": "Description of Project Y.", "contributions": ["Role and contributions in Project Y.", "Technologies used in Project Y."]}
    ]
}$$);
