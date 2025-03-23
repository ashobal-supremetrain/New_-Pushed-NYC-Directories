# Category Listing Page Wireframe - New York State Directory

```
+----------------------------------------------------------------------+
|                                                                      |
|  [LOGO] NEW YORK STATE DIRECTORY                [LOGIN] [REGISTER]   |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|                       BANNER ADVERTISEMENT                           |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|  +----------------------------------------------------------+        |
|  |                                                          |        |
|  |  +------------------+ +------------+ +--------------+    |        |
|  |  | Search keywords  | | Location ▼ | | Category  ▼  |    |        |
|  |  +------------------+ +------------+ +--------------+    |        |
|  |                                                          |        |
|  |                     [SEARCH BUTTON]                      |        |
|  |                                                          |        |
|  +----------------------------------------------------------+        |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|  HEALTHCARE SERVICES                                [SPONSORED BY X] |
|  Home > Healthcare                                                   |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|  FILTERS                  |                                          |
|                           |  [LIST VIEW] | [MAP VIEW]               |
|  Sub-categories:          |                                          |
|  □ Hospitals              |  Sort by: [Relevance ▼]                 |
|  □ Clinics                |                                          |
|  □ Dentists               |  Showing 1-20 of 156 results            |
|  □ Specialists            |                                          |
|  □ Mental Health          |  +----------------------------------+    |
|  □ Pharmacies             |  | [FEATURED]                       |    |
|  □ Physical Therapy       |  | NYC Health Hospital              |    |
|  □ Alternative Medicine   |  | Hospital • Manhattan             |    |
|                           |  | ★★★★☆ (4.5) • 0.8 miles          |    |
|  Rating:                  |  | Open Now • 24/7                  |    |
|  □ 5 stars                |  | "Top-rated emergency care..."    |    |
|  □ 4+ stars               |  | [VIEW DETAILS]                   |    |
|  □ 3+ stars               |  +----------------------------------+    |
|  □ 2+ stars               |                                          |
|  □ 1+ stars               |  +----------------------------------+    |
|                           |  | Brooklyn Medical Center           |    |
|  Distance:                |  | Clinic • Brooklyn                 |    |
|  □ Within 1 mile          |  | ★★★★★ (5.0) • 2.3 miles          |    |
|  □ Within 5 miles         |  | Open: 8AM-6PM                    |    |
|  □ Within 10 miles        |  | "Family practice with..."        |    |
|  □ Within 25 miles        |  | [VIEW DETAILS]                   |    |
|                           |  +----------------------------------+    |
|  Open Now: □              |                                          |
|                           |  +----------------------------------+    |
|  Verified: □              |  | Queens Dental Care               |    |
|                           |  | Dentist • Queens                 |    |
|  Accepts Insurance: □     |  | ★★★★☆ (4.2) • 3.5 miles          |    |
|                           |  | Open: 9AM-5PM                    |    |
|                           |  | "Specializing in cosmetic..."    |    |
|  +---------------------+  |  | [VIEW DETAILS]                   |    |
|  |                     |  |  +----------------------------------+    |
|  |     SIDEBAR         |  |                                          |
|  |     ADVERTISEMENT   |  |  +----------------------------------+    |
|  |                     |  |  | [FEATURED]                       |    |
|  |                     |  |  | Manhattan Mental Health          |    |
|  |                     |  |  | Mental Health • Manhattan        |    |
|  |                     |  |  | ★★★★☆ (4.7) • 1.2 miles          |    |
|  |                     |  |  | Open: 10AM-8PM                   |    |
|  |                     |  |  | "Compassionate therapy..."       |    |
|  |                     |  |  | [VIEW DETAILS]                   |    |
|  |                     |  |  +----------------------------------+    |
|  |                     |  |                                          |
|  +---------------------+  |  [LOAD MORE RESULTS]                    |
|                           |                                          |
+----------------------------------------------------------------------+
|                                                                      |
|                       BANNER ADVERTISEMENT                           |
|                                                                      |
+----------------------------------------------------------------------+
|                                                                      |
|  FOOTER                                                              |
|  About | Contact | Privacy Policy | Terms of Service | Advertise     |
|  © 2025 New York State Directory                                     |
|                                                                      |
+----------------------------------------------------------------------+
```

## Category Listing Page Components Description

### Header Section
- **Logo and Site Name**: Positioned at the top left
- **User Authentication**: Login and Register buttons at the top right
- **Top Banner Ad**: Full-width banner advertisement below the header

### Search Section
- **Compact Search Bar**: Smaller version of the homepage search
- **Location Dropdown**: Filter by city or ZIP code
- **Category Dropdown**: Pre-selected with current category

### Category Header
- **Category Title**: Large heading with current category name
- **Breadcrumb Navigation**: Shows path from homepage to current category
- **Sponsorship Label**: Optional "Sponsored by" text for category sponsors

### Main Content Area
- **View Toggle**: Switch between list view and map view
- **Sort Options**: Dropdown to sort by relevance, rating, distance, etc.
- **Results Count**: Shows number of listings found
- **Pagination**: "Load More Results" button at bottom

### Listing Cards
- **Featured Badge**: Visual indicator for paid premium listings
- **Business Name**: Prominent display of business name
- **Category & Location**: Subcategory and borough/neighborhood
- **Rating**: Star rating and numerical score
- **Distance**: Miles from user's location or search center
- **Hours**: Current open/closed status and business hours
- **Snippet**: Brief description or review excerpt
- **View Details Button**: Link to individual listing page

### Filter Sidebar
- **Subcategory Filters**: Checkboxes for specific subcategories
- **Rating Filter**: Filter by minimum star rating
- **Distance Filter**: Filter by proximity
- **Open Now Filter**: Show only currently open businesses
- **Verification Filter**: Show only verified listings
- **Insurance Filter**: Show only businesses accepting insurance
- **Sidebar Advertisement**: Vertical banner for targeted advertisements

### Footer Section
- **Bottom Banner Ad**: Full-width banner advertisement
- **Navigation Links**: About, Contact, Privacy Policy, etc.
- **Copyright Information**: Legal copyright notice

## Map View Variation
When map view is selected, the listing cards will be replaced with:
```
+----------------------------------------------------------------------+
|                                                                      |
|  +-------------------+                                               |
|  |                   |                                               |
|  |                   |                                               |
|  |                   |                                               |
|  |     MAP VIEW      |                                               |
|  |     WITH PINS     |                                               |
|  |                   |                                               |
|  |                   |                                               |
|  |                   |                                               |
|  +-------------------+                                               |
|                                                                      |
|  +----------------------------------+                                |
|  | Selected Listing Details         |                                |
|  | (Appears when pin is clicked)    |                                |
|  +----------------------------------+                                |
|                                                                      |
+----------------------------------------------------------------------+
```

## Responsive Considerations
- On mobile devices, filters collapse into an expandable drawer
- Map/List toggle becomes more prominent on mobile
- Listing cards stack vertically and expand to full width
- Sidebar advertisement moves below filters or between listings
- Filter options can be accessed via a "Filters" button that opens a modal
