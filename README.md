# DubHacks 2022 Hackathon: Vantage

## Inspiration

The idea for Vantage sprouted when our teammate Jake, a member of the Information School's Admissions Board, shared his experience scoring applications this past cycle. Through many applications, one student's story stood out. This student had previously immigrated from [REDACTED]. Growing up and moving between different schools and countries, he constantly struggled with speaking the native language. He described how Informatics was the perfect department for him because he wanted to make technology more globally accessible to help others overcome language and cultural boundaries using data-science and user research. As Jake read this student's application, they seemed like a perfect fit for the Informatics -- after all, they had strong academics at UW as well as a strong motivation to study this field. However, this student formatted his personal statements and essays as bullet points. Due to multiple formatting errors and a misunderstanding of the prompts, they unfortunately lost points on the rubric, and ultimately did not receive admission to the department.


In a parallel experience, Simar and Austin applied to HCDE this past summer. From their perspectives as a prospective applicant, they both had difficulty determining what style of stories worked best for their engineering application, especially since the prompts are particular to the University of Washington. Fortunately, they had a couple of older friends who shared their successful applications and advice for creating an essay that not only addresses all the main questions but also told a strong story about their interests and ideas. Having all of this program-specific information to reference for their own work gave them confidence when submitting their applications, and both were admitted.


Moreover, Austin is on the Executive Team of the highly-selective Lavin Entrepreneurship Program. Just last week, the Exec Team held an application workshop for applicants. During this event, Austin shared his own personal statements that worked when he applyied to the Lavin Program. The feedback from prospective applicants was incredibly positive, and those who had been previously stuck with their own applications were inspired by Austin’s essays and even sparked some ideas for their own.


Our combined experiences and perspectives on the often-unjust admissions process was a strong motivating factor for us. We want to ensure that all students have access to college counseling and essay mentorship such that their applications are not inhibited by unfamiliarity with the progam application or necessary formatting.
In a study written by the College of Williams and Mary Department of Psychology they state, “Once inspired, the individual experiences a compelling approach motivation to transmit, actualize, or express the new vision.” Being able to gain inspiration from the past experiences of others, students are able to become more introspective regarding their own experiences, and gain the confidence and assurance necessary to share their own stories within their applications. Out of the 20 students we interviewed before building Vantage, they were more than happy to share their own applications/essays, and also mentioned how they would’ve vastly benefited from seeing examples as well while they were applying. For students, it’s a win-win situation to be able to have others benefit from seeing your essays, while also gaining profit from that in return. After all, earning from your success is always the best reward in the end.

## What it does
College tutors and counselors are expensive and out of scope for many families. Additionally, tutors are often not even available or able to assist with the specific questions required for smaller programs and opportunities.
Vantage is an affordable marketplace, where admits can share their successful applications for specific and unique programs, and applicants can read from a database of examples. By being able to view multiple examples for applications that, unlike general college applications like the common and coalition application, are specific to smaller programs/departments and their unique questions, Vantage brings confidence and inspiration to applicants. With the vast number of examples, one can discover commonalities between successful admits, directly preventing the situation Jake witnessed where the student is unfamiliar with the necessary writing styles expected by an admissions board.

## Business Model

Applicants will pay a small fee to unlock a department/program's essays (this cost is variable depending on the popularity of the program and the number of applications available). In exchange, that fee will be split amongst all the admits who shared their applications. This results in an incentive-based model, in which students are inclined to help their fellow students while gaining passive income from the hard work and success they have already achieved. 

Vantage: 50%
Admits 1 cycles old: 20%
Admits 2 cycles old: 15%
Admits 3 cycles old: 10%
Admits 4 cycles old: 4%
Admits 5 cycles old: 0.5%
Admits 6 cycles old: 0.25%
Admits 7 cycles old: 0.15%
Admits 8 cycles old: 0.05%
Admits 9 cycles old: 0.03%
Admits 10 cycles old: 0.02%


## How we built it

Our team leveraged GCP Firebase to support our databases, transcript processing, authentication layer, and other functions. On the front-end, we built a cross-platform platform UI with ReactJS, NextJS, and Tailwind CSS. We developed our UI against thoughtfully-designed Figma wireframes. We ultimately deployed our app on Vercel at dh-22.vercel.app.

## Challenges we ran into

Learning and applying new software simultaneously was a challenge throughout our development. We worked together to quickly learn these new skills and enable the fast development we needed for our hackathon project. One example is learning NextJS. Half of our development team was unfamiliar with NextJS, whereas the other half was confident it would accelerate development. We ultimately worked together to make the most use of this software, and it paid off.
We also saw challenges with Firebase usage limits. We hit over 50,000 READs throughout our development, and we had to quickly recover from this unexpected volume.

## Accomplishments that we're proud of

We're proud of the transcript parsing system we developed for Vantage: any student interested in signing up for our platform will submit a PDF version of their transcript (to verify that they’re a successful applicant). Then, our parsing software will extract essential information, such as their major, GPA, and full coursework history, which will then be displayed along with their essay. Transcript parsing is crucial for a low-overhead user onboarding experience.

## What we learned
Throughout the development of Vantage, we not only learned many new skills while building the platform, but also gain a lot of insight regarding the different user’s that we wanted to support and their individual experiences and needs. We wanted to make our platform as accessible as possible to all students regardless of department or program, and learned how we could do this by creating a system that can be easily expanded to more smaller programs in the future, where having a relevant application to program-specific questions can be really impactful throughout each student’s journey.

## What's next for Vantage
1.We’re excited to conduct user interviews with potential applicants and readers of Vantage to tailor the product their needs.
2. Based on the learnings from these interviews, we want to start building a database of successful applications, centered around programs/departments at the University of Washington
3. We will build a more sophisticated dashboard and verification system for essay submissions. Some features may include strike-through redaction for personal information, and originality scores.
4. Once we have the collection of resources, we plan to implement a Stripe/Plaid integration so we can start charging users, and share earnings with those who share their applications. We also want to explore blurring personal statements vs supplemental essays (for users to preview before paying).
5. We also want to start exploring different payment amounts to determine the optimal revenue per user.

