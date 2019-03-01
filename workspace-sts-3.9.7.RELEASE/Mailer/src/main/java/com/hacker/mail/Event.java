package com.hacker.mail;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
@Entity
public class Event {
	 @Id
	 String ID;
	 String name;
	 Date month;
	 String city;
	 String country;
	 int poc;

	@OneToMany(targetEntity = Feedback.class, mappedBy = "eventid", orphanRemoval = false, fetch = FetchType.LAZY)
	 Set<Feedback> feedback;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "empID", insertable = false, updatable = false)
	@Fetch(FetchMode.JOIN)
	 Admin admin;
	/**
	 * @return the iD
	 */
	public String getID() {
		return ID;
	}
	/**
	 * @param iD the iD to set
	 */
	public void setID(String iD) {
		ID = iD;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the date
	 */
	public Date getMonth() {
		return month;
	}
	/**
	 * @param date the date to set
	 */
	public void setMonth(Date month) {
		this.month = month;
	}
	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}
	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}
	/**
	 * @param country the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}
	public int getPoc() {
		return poc;
	}
	public void setPoc(int poc) {
		this.poc = poc;
	}

}
