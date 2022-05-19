# Next Js Application For Fraternities / Sororities 
The application is made with the following stack
  
    - NextJS 
    - TailwindCSS 
    - Formik
    - MUI (the new one, not material ui) 
    - MUI Datagrid
    - Next JS api functions 
    - Aurora Postgres Serverless Postgres Sql Client 
    - ASW SDK with S3 and SNS 
    - Vercel Hosted
 
 The application is designed to be used to organize brothers/sisters, plan events, handle punishments & rewards, track attendance, and do a lot more for organizations involved in greek life
    
    
 ## Note 
  - The application was moved to AWS CodeCommit to keep the code more private and to not have to transfer ownership of the repo later on. So, the code here is only part of the application, however, the application does include a lot of really well thought out pieces that I find really useful. These include
    
    - The implementation of Aurora Serverless Client v1 
    - The Psuedo ORM Tables made in the scripts directory 
    - The Super quick and easy form wrapper that makes building simple forms really really quick (uses formik, yup, mui and tailwind) . 
    - The implementation of events being updating a group's google calendar whenever an event is updating in the application so ( technically this is a serverless multi-cloud architecture application ). 
    - The implementation of cron jobs that would make the archived field for events true  without actually deleting them, so it was easy to know what events actually happenend and which ones were simply deleted. 
