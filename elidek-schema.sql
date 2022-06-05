USE elidek;
CREATE TABLE Project (
  Project_id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,
  Title nvarchar(255),
  cost int,
  Description nvarchar(255),
  start_date date,
  end_date date,
  Duration int as (DATEDIFF(end_date, start_date) / 365),
  organization_id int ,
  Program_id int,
  Evaluation_id int unique auto_increment,
  executive_id int,
  evaluator_id int,
  Chief_id int
);



CREATE TABLE organization (
  org_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name nvarchar(255),
  abbreviation nvarchar(255),
  Postal_code int,
  Street_Name nvarchar(255),
  Street_Number int,
  City nvarchar(255),
  Category varchar(255),
  budget_Ministry int,
  budget_Priv int,
  budget_Equity int
);

CREATE TABLE telephones (
  number int,
  org_id int
);
 

CREATE TABLE researcher (
  researcher_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name nvarchar(255),
  Last_Name nvarchar(255),
  Gender nvarchar(255),
  BirthDate date,
  start_date date,
  age int,
  organization_id int
);

CREATE TABLE Program (
  Program_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name nvarchar(255),
  Elidek_Address nvarchar(255)
);

CREATE TABLE ScientificFields (
  name nvarchar(255) PRIMARY KEY
);
CREATE TABLE relates(
project_id int ,
Field_name nvarchar(255),
FOREIGN KEY (project_id) REFERENCES Project(project_id) ON DELETE CASCADE
ON UPDATE CASCADE,
  FOREIGN KEY (Field_name) REFERENCES scientificfields(name) ON DELETE CASCADE
ON UPDATE CASCADE

);
CREATE TABLE Executive (
  executive_id int PRIMARY KEY AUTO_INCREMENT,
  name nvarchar(255)
)
;

CREATE TABLE Deliverable (
  Title nvarchar(255),
  Description nvarchar(255),
  date date,
  projectid int,
CONSTRAINT PK_Deliverbale PRIMARY KEY (Title, projectid)

)
;
CREATE TABLE evaluation (
  Evaluation_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Grade int,
  Date Date
)
;

CREATE TABLE works (
  project_id int,
  researcher_id int,
  CONSTRAINT PK_works PRIMARY KEY (researcher_id, project_id)

);



-- Constraints------------------------------------------

ALTER TABLE Project 
ADD CONSTRAINT fk_org_id FOREIGN KEY (organization_id) REFERENCES organization (org_id)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Project 
ADD CONSTRAINT fk_program_id FOREIGN KEY (Program_id) REFERENCES Program (Program_id)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Project 
ADD CONSTRAINT fk_evtion_id FOREIGN KEY (Evaluation_id) REFERENCES evaluation (Evaluation_id)
ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE Project 
ADD CONSTRAINT fk_exec_id FOREIGN KEY (executive_id) REFERENCES Executive (executive_id)
ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE Project 
ADD CONSTRAINT fk_evtor_id FOREIGN KEY (evaluator_id) REFERENCES researcher (researcher_id)
ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE Project 
ADD CONSTRAINT fk_chief_id FOREIGN KEY (Chief_id) REFERENCES researcher (researcher_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE telephones 
ADD CONSTRAINT fkt_org_id FOREIGN KEY (org_id) REFERENCES organization (org_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE researcher 
ADD CONSTRAINT fkr_org_id FOREIGN KEY (organization_id) REFERENCES organization (org_id)
ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE Deliverable 
ADD CONSTRAINT fkd_pr_id FOREIGN KEY (projectid) REFERENCES Project (Project_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE works 
ADD CONSTRAINT fkw_pr_id FOREIGN KEY (project_id) REFERENCES Project (Project_id)
ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE works 
ADD CONSTRAINT fkw_res_id FOREIGN KEY (researcher_id) REFERENCES researcher (researcher_id)
ON DELETE CASCADE ON UPDATE CASCADE;

 ALTER TABLE organization
ADD CONSTRAINT chk_category CHECK (Category IN ('University', 'Research Centre', 'Company'));

 
ALTER TABLE organization
ADD CONSTRAINT chk_budgets CHECK ((Category = 'University' AND budget_Ministry IS NOT NULL AND budget_Priv IS NULL AND budget_Equity IS NULL)
                                  OR (Category ='Research Centre' AND budget_Ministry IS NOT NULL AND budget_Priv IS NOT NULL AND budget_Equity IS NULL)
                                  OR (Category = 'Company' AND budget_Ministry IS NULL AND budget_Priv IS NULL AND budget_Equity IS NOT NULL)
                                  );

ALTER TABLE PROJECT
ADD CONSTRAINT chk_end_date CHECK (end_date > start_date);

ALTER TABLE  PROJECT
ADD CONSTRAINT chk_duration CHECK (365<= Duration <= 365*4 +1);

ALTER TABLE evaluation
ADD CONSTRAINT chk_grade CHECK ((Grade <=10 and Grade >-1) OR (Date IS NULL AND Grade IS NULL));