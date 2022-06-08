CREATE UNIQUE INDEX del_idx ON Deliverable (Title, projectid); #unique index epeidi den theloume duplicates sto deliverable

CREATE UNIQUE INDEX wrk_idx ON works (researcher_id, project_id); #unique index giati den theloume duplicates sto table works

CREATE UNIQUE INDEX relation_idx ON relates(project_id, field_name); #unique index gia na min exoume duplicates

#ta parapanw prostethikan giati den mporousame na valoume san kleidi panw apo 1 attribute

CREATE INDEX p_id ON Project(project_id, organization_id); #index epeidi xrisimopoieitai poly sta queries

CREATE INDEX researcer_idx ON researcher(researcher_id, organization_id); #index epeidi exoume pollous researchers kai heloume apodotika queries
