# QUERY 3.6

SELECT r.Name, r.Last_Name, count(w.researcher_id) FROM
researcher r 
JOIN works w ON w.researcher_id = r.researcher_id
join Project p ON p.project_id = w.project_id
WHERE r.age<40 AND p.start_date IS NOT NULL AND (p.end_date IS NULL OR p.end_date > NOW())
GROUP BY w.researcher_id;

#	Query 3.8

SELECT r.name, r.Last_Name, count(w.project_id) FROM researcher r 
JOIN works w ON w.researcher_id = r.researcher_id 
JOIN Project p ON p.project_id = w.project_id 
WHERE p.project_id NOT IN( SELECT p.project_id FROM Project p JOIN Deliverable d ON p.project_id = d.projectid)
GROUP BY w.project_id HAVING count(w.project_id)>4;


# Query 3.2

create view view_project_by_researcher as
select r.Name, r.Last_Name, r.researcher_id, p.Title, p.project_id
from works w
join researcher r on r.researcher_id=w.researcher_id
join project p on p.project_id=w.project_id
order by r.researcher_id ;


CREATE VIEW project_by_organization as
SELECT o.name Organ_name,o.org_id as organ_id ,  p.title pro_title , p.project_id pro_id from organization o
join project p 
on p.organization_id=o.org_id
order by o.org_id;


# Query 3.4 .

CREATE VIEW V AS
SELECT o.org_id, o.name, p.project_id, year(p.start_date) as year_, count(p.project_id) as tot_pr
from organization o
join project p on o.org_id = p.organization_id 
where p.start_date is not null
group by o.org_id, year(p.start_date)
order by o.org_id;

CREATE VIEW two_years as
SELECT v1.org_id, v1.name, v1.project_id, v1.year_, sum(v1.tot_pr) as nop from v v1
join v v2 
on v1.name = v2.name
where v1.year_ - v2.year_=1 or v1.year_ - v2.year_=-1
group by v1.org_id;
 
 SELECT v.name, concat(v.year_, '-', v.year_+1) as years, v.nop from two_years v
 join two_years v2 on v.nop=v2.nop
 where v.org_id<>v2.org_id
order by v.nop;


# Query 3.7
 
 select sum(p.cost), e.executive_id,e.name,  o.name, o.org_id
 from project p
 join executive e on e.executive_id = p.executive_id
 join organization o on o.org_id =p.organization_id
 group by o.org_id
 order by 1 desc
 LIMIT 5
;

# Query 3.5
select  r.field_name,  r2.field_name  ,count(*)

from relates r
join relates r2 on r2.project_id=r.project_id
join project p on p.project_id=r.project_id
where r2.field_name < r.field_name
group by r2.field_name, r.field_name
order by 3 desc
limit 3
;