package com.hacker.mail;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminController  { 
	@Autowired
	private AdminRepository adminRepository;
	@Autowired
	private EventRepository eventRepo;
	@Autowired
	EntityManagerFactory emf ;
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@RequestMapping(value="/createRole", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createUser(@RequestBody Admin role) throws EncryptedDocumentException, IOException {

		Admin admin = new Admin();

		admin.setEmpID(role.empID);
		admin.setName(role.name);
		admin.setPhoneNum(role.phoneNum);
		admin.setRole(role.role);
		admin.setPwd(Integer.toString(role.empID)+"@cts");
		//admin.setEventid(role.eventid);

		System.out.println("COming to springg"+admin.phoneNum);
		adminRepository.save(admin);
		return ResponseEntity.ok().build();
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@RequestMapping(value="/loadRoles")
	public ResponseEntity<String> loadRoles() throws EncryptedDocumentException, IOException {

		String SAMPLE_XLSX_FILE_PATH = "C:\\Users\\Admin\\Documents\\workspace-sts-3.9.7.RELEASE\\Mailer\\src\\main\\resources\\Admin List.xlsx";

		Workbook workbook = WorkbookFactory.create(new File(SAMPLE_XLSX_FILE_PATH));

		// Getting the Sheet at index zero
		Sheet sheet = workbook.getSheetAt(0);
		// Create a DataFormatter to format and get each cell's value as String
		DataFormatter dataFormatter = new DataFormatter();
		// 2. Or you can use a for-each loop to iterate over the rows and columns
		System.out.println("\n\nIterating over Rows and Columns using for-each loop\n");
		for (Row row: sheet) { 
			if(0!= row.getRowNum())
			{  Admin admin = new Admin();

			 admin.setEmpID(Integer.parseInt(dataFormatter.formatCellValue(row.getCell(0))));
		 	    	admin.setName(dataFormatter.formatCellValue(row.getCell(1)));
		 	    	admin.setPhoneNum(Integer.parseInt(dataFormatter.formatCellValue(row.getCell(3))));
		 	    	admin.setRole(dataFormatter.formatCellValue(row.getCell(2)));
		 	    	admin.setPwd(dataFormatter.formatCellValue(row.getCell(0))+"@cts");
		 	    	
			 
			adminRepository.save(admin); }}
		return ResponseEntity.ok().build();

}

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value="/createEvent", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<String> createEvent(@RequestBody Event event) {

	Event e = new Event();

	e.setID(event.ID);
	e.setName(event.name);
	e.setCity(event.city);
	e.setCountry(event.country);
	e.setMonth(event.month);
	e.setPoc(event.poc);

	eventRepo.save(e);
	return ResponseEntity.ok().build();
}
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value="/loadEvents")
public ResponseEntity<String> loadEvents() throws EncryptedDocumentException, IOException {


	String SAMPLE_XLSX_FILE_PATH = "C:\\Users\\Admin\\Documents\\workspace-sts-3.9.7.RELEASE\\Mailer\\src\\main\\resources\\Outreach Event Summary.xlsx";

	Workbook workbook = WorkbookFactory.create(new File(SAMPLE_XLSX_FILE_PATH));

	// Getting the Sheet at index zero
	Sheet sheet = workbook.getSheetAt(0);
	// Create a DataFormatter to format and get each cell's value as String
	DataFormatter dataFormatter = new DataFormatter();
	// 2. Or you can use a for-each loop to iterate over the rows and columns
	System.out.println("\n\nIterating over Rows and Columns using for-each loop\n");
	for (Row row: sheet) { 
		if(0!= row.getRowNum())
		{  Event e = new Event();
		try {
		e.setID(dataFormatter.formatCellValue(row.getCell(0)));
		e.setName( dataFormatter.formatCellValue(row.getCell(8)));
		e.setCity( dataFormatter.formatCellValue(row.getCell(2)));
		e.setCountry( dataFormatter.formatCellValue(row.getCell(4)));
		e.setMonth( new SimpleDateFormat("dd-mm-yyy").parse(dataFormatter.formatCellValue(row.getCell(10))));
		e.setPoc(  Integer.parseInt(dataFormatter.formatCellValue(row.getCell(18))));
		}
		catch(Exception ex) {
			System.out.println(" Data format exception");
		}
		eventRepo.save(e); }}
	return ResponseEntity.ok().build();
}


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value="/login", method = RequestMethod.GET)
public @ResponseBody List <String> login(@RequestParam("empID") long empID, @RequestParam("pwd") String pwd) {
	EntityManager entityManager = emf.createEntityManager();


	// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

	entityManager.getTransaction().begin();

	List <String> role  =entityManager.createQuery("SELECT role FROM Admin where empID="+empID+" and pwd="+"'"+pwd+"'").getResultList();


	entityManager.getTransaction().commit();
	entityManager.close();
	return role ;
}

//change pwd 
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value="/changePwd", method = RequestMethod.POST)
public @ResponseBody int changePwd(@RequestParam("empID") int empID, @RequestParam("pwd") String pwd ,@RequestParam ("newPwd") String newPwd) {
	EntityManager entityManager = emf.createEntityManager();


	// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

	entityManager.getTransaction().begin();

	Query query = entityManager.createQuery("update Admin set pwd=:newPwd where empID=:empID and pwd=:pwd");
	query.setParameter("pwd", pwd);
	query.setParameter("empID", empID);
	query.setParameter("newPwd", newPwd);
	int rowsUpdated = query.executeUpdate();
	entityManager.getTransaction().commit();
	entityManager.close();
	
	return rowsUpdated ;
}
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RequestMapping(value="/getEvents", method = RequestMethod.GET)
public @ResponseBody ArrayList eventList(@RequestParam("empID") long empID) {
	EntityManager entityManager = emf.createEntityManager();


	// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

	entityManager.getTransaction().begin();

	ArrayList result  =  (ArrayList)entityManager.createQuery("SELECT id,name FROM Event where poc="+empID).getResultList();


	entityManager.getTransaction().commit();
	entityManager.close();
	return result ;
}


}
