use elidek;
DELIMITER //
CREATE TRIGGER chied_start_date BEFORE insert  on project
for each row
begin
if (new.start_date < (select start_date from researcher 
where new.chief_id= researcher_id ))
then signal sqlstate '45007' set message_text = 'Error on chief start date';
 end if;

END; //

CREATE TRIGGER del_date BEFORE INSERT ON Deliverable FOR EACH ROW
BEGIN

IF (NEW.date < (SELECT start_date FROM Project AS P WHERE P.Project_id = NEW.projectid))
OR (NEW.date > (SELECT end_date FROM Project AS P WHERE P.Project_id = NEW.projectid)) THEN 
signal sqlstate '45007' set message_text = 'Error on start or end date';
END IF; 

END;//


CREATE TRIGGER ev_date BEFORE INSERT ON evaluation FOR EACH ROW
BEGIN

IF((NEW.Date > (SELECT start_date FROM Project AS P WHERE P.Evaluation_id = NEW.Evaluation_id))
) THEN
signal sqlstate '45007' set message_text = 'Error on evaluation date';

END IF;


END;//
/*
CREATE TRIGGER cost_budget before INSERT ON project FOR EACH ROW
BEGIN

IF (((SELECT SUM(new.cost)  as total_cost from project p where p.organization_id=new.organization_id 
group by NEW.organization_id )
> (select budget_ministry + budget_Priv + budget_Equity as budget from 
organization o 
where new.organization_id=o.org_id )
AND 
(select * from project p where p.organization_id=new.organization_id) is null and
( new.cost > (select  budget_ministry + budget_Priv + budget_Equity as budget from 
organization o 
where  new.organization_id=o.org_id )
)))

 THEN
signal sqlstate '45000' set message_text = 'The organization budget is less than the total costs of projects  ';

END IF;


END;//

*/
CREATE TRIGGER abbr before INSERT ON organization
FOR EACH ROW
BEGIN

SET NEW.abbreviation = substr(NEW.name,1,3);

END; //


CREATE TRIGGER check_age before INSERT ON researcher
FOR EACH ROW
BEGIN 


SET NEW.age = (YEAR(NOW()) - YEAR(new.BirthDate));

END; //

CREATE TRIGGER evaluator_org  before insert on project 
for each row
begin
if (new.evaluator_id in (
select r.researcher_id from project p 
join organization o on o.org_id=p.organization_id
join researcher r on r.organization_id=o.org_id 
where p.project_id=new.project_id))
then  signal sqlstate '45000' set message_text = 'The evaluator cannot work in the organization which funds the project';

end if;
end;//


CREATE TRIGGER chief_ins AFTER INSERT ON Project 
FOR EACH ROW
BEGIN
IF(NEW.chief_id NOT IN (SELECT researcher_id FROM works)) THEN
INSERT INTO works (project_id, researcher_id) values (New.project_id, New.chief_id) ;

END IF;

END; //


CREATE TRIGGER fix_r_org_id after insert on project
for each row
begin

update researcher r set r.organization_id = new.organization_id where new.chief_id = r.researcher_id;

END; //

