// Maps service slugs to the matching option label in each quote form dropdown.

const heroFormDefaults: Record<string, string> = {
  'foundation-excavation': 'Foundation dig',
  'land-grading-drainage': 'Land grading & drainage',
  'dirt-gravel-delivery': 'Dirt & gravel delivery',
  'site-preparation-land-grading': 'Site prep & grading',
  'driveway-parking-lot-preparation': 'Site prep & grading',
  'dump-truck-rental': 'Dirt & gravel delivery',
  'heavy-equipment-hauling': 'Other / not sure',
  'volvo-a35-off-road-dump-truck-rental': 'Other / not sure',
  'house-barn-demolition': 'Demolition',
  'pond-digging-cleaning': 'Other / not sure',
};

const contactFormDefaults: Record<string, string> = {
  'foundation-excavation': 'Foundation Excavation',
  'land-grading-drainage': 'Drainage',
  'dirt-gravel-delivery': 'Gravel Delivery',
  'site-preparation-land-grading': 'Site Grading',
  'driveway-parking-lot-preparation': 'Driveway',
  'dump-truck-rental': 'Dump Truck Services',
  'heavy-equipment-hauling': 'Equipment Hauling',
  'volvo-a35-off-road-dump-truck-rental': 'Equipment Hauling',
  'house-barn-demolition': 'Demolition',
  'pond-digging-cleaning': 'Other',
};

export function getHeroFormWorkType(slug: string): string | undefined {
  return heroFormDefaults[slug];
}

export function getContactFormWorkType(slug: string): string | undefined {
  return contactFormDefaults[slug];
}
