# database_elidek

Οδηγίες Εγκατάστασης Εφαρμογής:

Requirements:  1) Mysql workbench ή κάποιο DBMS της επιλογής σας.
2) https://nodejs.org/en/download/
3) Visual studio code
4) Xampp
Τρέχουμε την εφαρμογή xampp και πατάμε το κουμπί start στο module mysql.
Αφόυ εγκαταστήσετε το DΒMS της επιλογής σας, τοποθετείστε τα credentials σας κατα την εισόδο στην εφαρμογή. Στη συνέχεια τρέξτε τα αρχεία sql από τον φάκελο
elideksql στο github με την ακόλουθη σειρά: 1) schema_script.sql 
				            2) index.sql
					    3)triggers.sql
					    4)dummyinsertions.sql

Στην συνέχεια αφού εγκασταστήσετε το visual studio , τοποθετήστε τα credential σας στο αρχείο .env.local. Έπειτα, έχοντας ανόίξει ένα terminal, 
και βρισκόμενοι στο directory που αποθηκέυτηκαν τα απαιτούμενα αρχεία, τρέχουμε την εξής εντολή στο terminal: npm install 
Η παραπάνω εντολή εγκαθιστά τα απαιτούμενα packages. 
Για να εκκινήσουμε το local server τρέχουμε επίσης την εντολή: npm run start.
Τέλος , ανοίγουμε τον περιηγητή και ακολουθόυμε τον σύνδεσμο: http://localhost:3000
Σε περίπτωση που έχουμε αλλάξει το serverport (3000 στην δικιά μας περίπτωση) προσέχουμε να αντικαταστήσουμε το 3000 με το αντίστοιχο port.
