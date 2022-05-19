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
       
       - ```jsx
            // Actual usage of the db util class 
        
            import Database, { handleSQLRequest } from "../../utils/aurora_postgres_db";

            const db = new Database('brothers')

            export const getAllBrothers = async () => { 
                return await handleSQLRequest(`SELECT * FROM brothers WHERE (deleted is false and active is true ) ; `) ; 
            }


            export const getBrother = async (req , res) => { 
                return await db.getOne(req.query.id);

            }

            export const createBrother = async (req) => { 
                return await db.create(req.body)
            }

            export const updateBrother = async (req, res) => { 
                return  await db.update(req.body, req.query.id);
            }

            export const deleteBrother = async(req) => {
                return await db.delete(req.query.id)
            }  
            
            ...
          
          // (different file) 
          // The aws sdk being defined, not the util db class but the authentication and authorization initialization for the pg serverless client 
          
          require("dotenv").config();
          const AWS = require("aws-sdk");
          const knexDataApiClient = require("knex-aurora-data-api-client");

          AWS.config.update({
            region: "us-east-1",

            credentials: {
              accessKeyId: String(process.env.AWS_AK_APP),
              secretAccessKey: String(process.env.AWS_SK_APP),
            },
          });

          const db = require("knex")({
            client: knexDataApiClient.postgres,
            connection: {
              secretArn: String(process.env.SECRET_ARN),
              resourceArn: String(process.env.CLUSTER_ARN), // Required
              database: String(process.env.DB_NAME),
              region: String(process.env.REGION_APP),
            },
          });

          function handleResponse(rdsResponse){
            console.clear();
            console.log("\n\n\nResponse:\t", rdsResponse, "\n\n\n\n\n\n");
            return rdsResponse;
          }

          function handleError(rdsErrorResponse){
            console.clear();
            console.log("\n\n\nError:\t", rdsErrorResponse, "\n\n\n\n\n\n");
            return rdsErrorResponse;
          }

          async function handleSQLRequest(sqlString) {
            let response = await db.raw(sqlString)
              .then(response => response.records)
              .then(records => handleResponse(records))
              .catch(error => handleError(error))
            return response;
          }


         
    - The Psuedo ORM Tables made in the scripts directory 
      
      - ```js
        // Fields included in every entity
          const shared_fields = [
            DBTable.field("id", str),
            DBTable.field("create_date", dt),
            DBTable.field("update_date", dt),
            DBTable.field("deleted", bool),
          ];

          // fields for the account table
          const brother_fields = [
            ...shared_fields,
            DBTable.field("name", lstr),
            DBTable.field("scroll_number", numb),
            DBTable.field("cell_phone", lstr),
            DBTable.field("active", bool),
            DBTable.field("email", lstr),
          ];

          // fields for the account table
          const account_fields = [
            ...shared_fields,
            DBTable.field("brother_id", str),
            DBTable.field("password", lstr),
          ];

          // fields for the permissions table
          const permission_fields = [
            ...shared_fields,
            DBTable.field("permission_group", lstr),
            DBTable.field("account_id", lstr),
          ];

       
         ```
    - The Super quick and easy form wrapper that makes building simple forms really really quick (uses formik, yup, mui and tailwind) . 
      
        -  ```js
              	const FormTemplate = [
                  [
                    {
                      fieldName: "name",
                      label: "Name",
                      type: "text",
                      value: brother.name,
                    },
                    {
                      fieldName: "cell_phone",
                      label: "Cellphone",
                      type: "tel",
                      value: brother.cell_phone,
                    },
                  ],
                  [
                    {
                      fieldName: "scroll_number",
                      label: "Scroll Number",
                      type: "number",
                      value: brother.scroll_number,
                    },
                    {
                      fieldName: "email",
                      label: "Email",
                      type: "email",
                      value: brother.email,
                    },
                  ],
                ];
                
                ... code removed for clarity 
                
              return (
                <LoggedIn>
                  <div className="overflow-y-hidden ">
                    <NavAndTab
                      icon={
                        <IconButton onClick={handleGoBack}>
                          <ArrowBack className="icon" />
                        </IconButton>
                      }
                      title={"Create Brother"}
                      tabs={TABS}
                      selectedTab={tab}
                      setTab={tab => setTab(tab)}
                      loading={loading}
                      error={error}
                      hideNav={true}
                    >
                      <FormTemplateComponent
                        initialValues={brother}
                        submitValue={values => handleSubmit(values)}
                        validationSchema={validation}
                        FormTemplate={FormTemplate}
                        constant={false}
                      />
                    </NavAndTab>
                  </div>
                </LoggedIn>
              );
           ```
           
           -  The component itself 
              ```jsx
              export const FormTemplateComponent = ({
                                    initialValues,
                                    submitValue,
                                    validationSchema,
                                    FormTemplate,
                                    constant,
                                    ...props
                                }) => {
                                    const formik = useFormik({
                                        initialValues: initialValues,
                                        validationSchema: Yup.object().shape(validationSchema),
                                        onSubmit: values => submitValue(values),
                                    });

                                      return (
                                        <Form onSubmit={formik.handleSubmit}>
                                            {FormTemplate.map((eachRow, index1) => (
                                                <FormRow key={index1*.2}>
                                                    {eachRow.map((eachField, index2) =>
                                                        constant ? (
                                                            <ConstantTextInput
                                                                {...Field(
                                                                    formik,
                                                                    eachField.fieldName,
                                                                    eachField.label,
                                                                    eachField?.type || "text"
                                                                )}
                                                                value={String(eachField.value)}
                                                                onChange={() => {}}
                                                                key={index2*2}

                                                            />
                                                        ) : (
                                                            <TextInput
                                                                {...Field(
                                                                    formik,
                                                                    eachField.fieldName,
                                                                    eachField.label,
                                                                    eachField?.type || "text"
                                                                )}
                                                                key={index2*2}
                                                            />
                                                        )
                                                    )}
                                                </FormRow>
                                            ))}
                                            {constant ? null : (
                                                <div className="flex flex-row gap-4 my-8 w-full flex-wrap lg:flex-nowrap justify-end">
                                                    <PrimaryButton type="submit">
                                                        Submit
                                                    </PrimaryButton>
                                                </div>
                                            )}
                                        </Form>
                                    );
                                };
              ```

    - The implementation of events being updating a group's google calendar whenever an event is updating in the application so ( technically this is a serverless multi-cloud architecture application ). 
    - The implementation of cron jobs that would make the archived field for events true  without actually deleting them, so it was easy to know what events actually happenend and which ones were simply deleted. 
