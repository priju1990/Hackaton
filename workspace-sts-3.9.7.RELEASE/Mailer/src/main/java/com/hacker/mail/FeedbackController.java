package com.hacker.mail;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;


import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hacker.mail.FeedbackRepository;
@Controller

public class FeedbackController {
	@Autowired
	private FeedbackRepository feedbackRepository;
	@Autowired
	EntityManagerFactory emf ;
	 @Autowired
	    private JavaMailSender emailSender;

	public ResponseEntity<String> createFeedBack(@RequestBody Feedback feedback) {

		Feedback feed =feedback;

		feedbackRepository.save(feed);
		System.out.println("COming to springg"+feedback.empID);

		return ResponseEntity.ok().build();
	}
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@RequestMapping(value="/persistFeedback", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	public  @ResponseBody int updateFeedback(@RequestBody Feedback feedback) {
		System.out.println("coming here");


		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		//	Iterable<Feedback> feed  =( Iterable<Feedback>) entityManager.createQuery("update Feedback set businessUnit="+feedback.businessUnit+", description="+"'"+feedback.description+"'"+", rating="+feedback.rating+", improvement="+feedback.improvement+" where empID="+feedback.empID +" and eventid="+feedback.eventid).getResultList();
		Query query = entityManager.createQuery("update Feedback set businessUnit=:businessUnit, description=:description, rating=:rating, improvement=:improvement where empID=:empID and eventid=:eventid");
		query.setParameter("businessUnit", feedback.businessUnit);
		query.setParameter("description", feedback.description);
		query.setParameter("rating", feedback.rating);
		query.setParameter("improvement", feedback.improvement);
		query.setParameter("eventid", feedback.eventid);
		query.setParameter("empID", feedback.empID);
		int rowsUpdated = query.executeUpdate();

		entityManager.getTransaction().commit();
		entityManager.close();
		return rowsUpdated;
		//return feedbackRepository.findAll();
	}
//get feedback count,poc detail,event date for events
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackDetailsForEvent")
	public  @ResponseBody ArrayList  getFeedbackDetailsForEvent() {
		System.out.println("coming here");
ArrayList res= new ArrayList();

		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		ArrayList feed  =( ArrayList) entityManager.createQuery("select count(*),f.eventid,f.empID from Feedback f where f.description is not null or f.rating >0 group by f.eventid ").getResultList();
	ArrayList totalExpFeedback = (ArrayList)entityManager.createQuery("select count(*),f.eventid, f.empID from Feedback f group by f.eventid").getResultList();
	
	res.add(feed);
	res.add(totalExpFeedback);
		entityManager.getTransaction().commit();
		entityManager.close();
		return res;
		//return feedbackRepository.findAll();
	}
	
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackByEvent")
	public  @ResponseBody Iterable <Feedback> getFeedbackByEventID(@RequestParam("eventID") int eventid) {
		System.out.println("coming here");


		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		Iterable<Feedback> feed  =( Iterable<Feedback>) entityManager.createQuery("SELECT count(f.rating),f.rating FROM Feedback f where f.eventid="+eventid+" and f.rating >0 group by f.rating").getResultList();


		entityManager.getTransaction().commit();
		entityManager.close();
		return feed;
		//return feedbackRepository.findAll();
	}
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackByCountry")
	public  @ResponseBody ArrayList getFeedbackByCountry() {
		System.out.println("coming here");


		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		ArrayList feed  =( ArrayList) entityManager.createQuery("select avg(f.rating),e.country from Feedback f,Event e where f.eventid=e.id and f.rating>0 group by e.country").getResultList();


		entityManager.getTransaction().commit();
		entityManager.close();
		return feed;
		//return feedbackRepository.findAll();
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackByBU")
	public  @ResponseBody Iterable <Feedback> getFeedbackByBU() {

		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		Iterable<Feedback> feed  =( Iterable<Feedback>) entityManager.createQuery("SELECT avg(f.rating),f.businessUnit FROM Feedback f where f.rating>0 group by f.businessUnit").getResultList();


		entityManager.getTransaction().commit();
		entityManager.close();
		return feed;
		//return feedbackRepository.findAll();
	}

	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackByMonth")
	public  @ResponseBody ArrayList getFeedbackByMonth() {

		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();
		try {	
			ArrayList feed  =( ArrayList) entityManager.createQuery("select avg(f.rating),monthname(e.month) from Event e,Feedback f where e.id=f.eventid group by monthname(e.month) order by month(e.month)").getResultList();


			entityManager.getTransaction().commit();
			entityManager.close();
			return feed;}
		catch(Exception e) {
			e.printStackTrace();
		}return new ArrayList();
		//return feedbackRepository.findAll();
	}

	//select avg(rating),e.city from feedback f  , event e where eventid=e.id group by  e.city;
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getFeedbackByCity")
	public  @ResponseBody ArrayList getFeedbackByCity() {

		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();


		// EntityManagerFactory emfactory = Persistence.createEntityManagerFactory( "Eclipselink_JPA" );

		entityManager.getTransaction().begin();

		ArrayList feed  =(ArrayList) entityManager.createQuery("select avg(f.rating),e.city from Feedback f,Event e where f.eventid=e.id and f.rating>0 group by e.city").getResultList();


		entityManager.getTransaction().commit();
		entityManager.close();
		return feed;
		//return feedbackRepository.findAll();
	}
	//get list of defaulters and send reminders
	//select empid, eventid from feedback where rating=0 and description=null
	@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
	@GetMapping("/getDefaulters")
	public  @ResponseBody Iterable<Object>  getDefaulterList() {

		//Use below code on create/update
		EntityManager entityManager = emf.createEntityManager();

		entityManager.getTransaction().begin();

		ArrayList feed  =( ArrayList) entityManager.createQuery("select f.empID, f.eventid from Feedback f where f.rating=0 and f.description is null").getResultList();

		entityManager.getTransaction().commit();
		entityManager.close();
		for(Object obj : feed) {
			Object []f= (Object [])	obj;
		
	//Object []f=	(Object [])feed.get(0);
	//System.out.println(f[0]);
			Email mail = new Email();

			mail.setFrom("priya.raju1003@gmail.com");
			mail.setTo("priyaraju.me@gmail.com");
			mail.setSubject("Feedback for Outreach Event"+f[0]);
			mail.setContent(" It is observed that you have" + 
					"not recorded your feedback/comments " + 
					"related to the Outreach event." + 
					"Please click on the link and provide your inputs." + 
					"Your inputs are vital for improving the Outreach events." + 
					"Please corporate. http://localhost:3000/feedback2?empID="+f[0]+"&eventID="+f[1]);
			System.out.println(f[0]);
			SimpleMailMessage message = new SimpleMailMessage();
			message.setSubject(mail.getSubject());
			message.setText(mail.getContent());
			message.setTo(mail.getTo());
			message.setFrom(mail.getFrom());
		 emailSender.send(message);}

		return feed;
	}


}