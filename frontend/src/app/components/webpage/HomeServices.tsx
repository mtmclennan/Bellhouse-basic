import React from 'react';
import classes from './HomeServices.module.scss';
import ServiceCard from './ServiceCard';
import image1 from './../../../public/assets/foundation-excavation-machinery.jpg';
import image2 from './../../../public/assets/truck-hauling-heavy-equipment.jpg';
import image3 from './../../../public/assets/dump-truck-delivery-service.jpg';
import image4 from './../../../public/assets/Driveway-parking-lot-skid-steer.jpg';
import image5 from './../../../public/assets/septic-system-installation-contractor.jpg';
import image6 from './../../../public/assets/off-road-truck-rock-truck-rental.jpg';
import serviceData from '../../../data/services.json';

export default function HomeServices() {
  return (
    <section className={classes.container}>
      <h2>Reliable Excavation and Trucking Services</h2>
      <ul className={classes.grid}>
        {serviceData.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.card.image}
            alt={service.card.alt}
            description={service.card.description}
            link={service.slug}
            title={service.card.title}
          />
        ))}
        {/* <ServiceCard
          key={1}
          title="Foundation Excavation and Backfill"
          description="Expert foundation digging and backfilling to ensure stability and support for your construction projects."
          image={image1}
          alt="Excavation machinery working on foundation digging and backfilling for a construction project."
        />
        <ServiceCard
          key={2}
          title="Trucking - Heavy Equipment floating"
          description="We offer reliable float truck services to transport heavy equipment like excavators to construction sites, ensuring secure and timely delivery every time."
          image={image2}
          alt="A truck hooked to a float trailer carrying an excavator, ready for transport on a construction site."
        />
        <ServiceCard
          key={3}
          title="Dump Truck Services - dirt and gravel delivery"
          description="Reliable dump truck services for dirt and gravel delivery. Trucks for hire available for construction, landscaping, and driveway needs."
          image={image3}
          alt="A tri-axle dump truck being loaded with material by an excavator on a construction site, showcasing heavy equipment in action."
        />
        <ServiceCard
          
          title="Driveways and Parking Lots"
          description="We provide expert grading and leveling services for driveways and parking lots. Our skid steer or dozer ensures smooth, durable surfaces for your property."
          image={image4}
          alt="A skid steer leveling a large driveway, preparing the surface for a smooth and even finish, showcasing driveway grading services."
        />
        <ServiceCard
          title="Septic System Installation"
          description="Expert septic system installation services. Our experienced team ensures efficient and reliable installation for your home or business needs."
          image={image5}
          alt="An excavator digging for septic system installation, preparing the site for tank placement, showcasing professional septic system services."
        />
        <ServiceCard
          title="Off-road Dump Truck"
          description="Off-road truck A35 bulk material moving and rentals with operator. Ideal for heavy hauling on tough terrain, we ensure efficient and reliable service."
          image={image6}
          alt="An excavator digging for septic system installation, preparing the site for tank placement, showcasing professional septic system services."
        /> */}
      </ul>
      <div className={classes.cta}>
        <h3>Call Us Now</h3>
        <h4>519-752-8500</h4>
      </div>
    </section>
  );
}
