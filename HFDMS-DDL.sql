--DDL--
CREATE TABLE Members (
    MemberID SERIAL PRIMARY KEY,
    FullName VARCHAR(255),
    HealthMetricsID INT,
    ScheduleID INT,
    SubscriptionStatus VARCHAR(255) CHECK (SubscriptionStatus IN ('Waiting', 'Approved', 'Restricted'))
);

CREATE TABLE HealthMetrics (
    HealthMetricsID SERIAL PRIMARY KEY,
    CurrentWeight FLOAT,
    GoalWeight FLOAT,
    Height FLOAT
);

CREATE TABLE Bills (
    BillID SERIAL PRIMARY KEY,
    MemberID INT,
    Amount FLOAT,
    DueDate DATE,
    PAID BOOLEAN
);

CREATE TABLE Schedules (
    ScheduleID SERIAL PRIMARY KEY,
    MemberID INT,
    TrainerID INT,
    BookingID VARCHAR(255),
    ActivityType VARCHAR(255),
    ScheduleStatus VARCHAR(255) CHECK (ScheduleStatus IN ('NA', 'Scheduled', 'Confirmed')),
    Date DATE
);

CREATE TABLE Trainers (
    TrainerID SERIAL PRIMARY KEY,
    FullName VARCHAR(255),
    AvailabilityID INT
);

CREATE TABLE Availability (
    AvailabilityID SERIAL PRIMARY KEY,
    TrainerID INT,
    Date DATE,
    StartTime TIME,
    EndTime TIME,
    Available BOOLEAN
);

CREATE TABLE RoomBooking (
    BookingID SERIAL PRIMARY KEY,
    AdminID INT,
    RoomID VARCHAR(255),
    Booked BOOLEAN
);

CREATE TABLE AdministrativeStaff (
    AdminID SERIAL PRIMARY KEY,
    FullName VARCHAR(255)
);

CREATE TABLE Equipment (
    EquipmentID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    Status VARCHAR(255),
    LastMaintenanceDate DATE,
    Notes TEXT
);

-- Setting Constraints For MEMBER Table--
ALTER TABLE Members
ADD CONSTRAINT fk_healthmetrics
FOREIGN KEY (HealthMetricsID) REFERENCES HealthMetrics(HealthMetricsID);

ALTER TABLE Members
ADD CONSTRAINT fk_schedule
FOREIGN KEY (ScheduleID) REFERENCES Schedules(ScheduleID);

-- Setting Constraints For BILLS Table--
ALTER TABLE Bills
ADD CONSTRAINT fk_member_bill
FOREIGN KEY (MemberID) REFERENCES Members(MemberID);

-- Setting Constraints For SCHEDULES Table--
ALTER TABLE Schedules
ADD CONSTRAINT fk_booking_schedule
FOREIGN KEY (BookingID) REFERENCES RoomBooking(BookingID);

-- Setting Constraints For TRAINERS Table--
ALTER TABLE Trainers
ADD CONSTRAINT fk_availability_trainer
FOREIGN KEY (AvailabilityID) REFERENCES Availability(AvailabilityID);

-- Setting Constraints For AVAILABILITY Table--
ALTER TABLE Availability
ADD CONSTRAINT fk_trainer_availability
FOREIGN KEY (TrainerID) REFERENCES Trainers(TrainerID);

-- Setting Constraints For ROOMBOOKING Table--
ALTER TABLE RoomBooking
ADD CONSTRAINT fk_admin_roombooking
FOREIGN KEY (AdminID) REFERENCES AdministrativeStaff(AdminID);

-- I figured I would need to add a PIN col in my Admins --
ALTER TABLE AdministrativeStaff ADD COLUMN Pin TEXT;
UPDATE AdministrativeStaff SET Pin = '1234' WHERE AdminID = 1;
UPDATE AdministrativeStaff SET Pin = '2345' WHERE AdminID = 2;
UPDATE AdministrativeStaff SET Pin = '3456' WHERE AdminID = 3;
UPDATE AdministrativeStaff SET Pin = '4567' WHERE AdminID = 4;
UPDATE AdministrativeStaff SET Pin = '5678' WHERE AdminID = 5;

-- I also would need a unique userName for each Memmber, and a pin too --
ALTER TABLE Members
ADD COLUMN username VARCHAR(255) NOT NULL,
ADD COLUMN pin VARCHAR(255) NOT NULL;

ALTER TABLE Members
ADD CONSTRAINT unique_username
UNIQUE (username);