# Ad Layout Structure - New York State Directory

This document outlines the comprehensive ad layout structure for the New York State Directory platform, detailing ad placements, sizes, and monetization strategies across all views.

## Ad Types and Placements

### Banner Advertisements
```
+----------------------------------------------------------------------+
|                                                                      |
|                       BANNER ADVERTISEMENT                           |
|                       (970x90 or 728x90)                             |
|                                                                      |
+----------------------------------------------------------------------+
```

**Top Banner**
- **Location**: Below the header navigation on all pages
- **Size**: 970x90 pixels (desktop), 728x90 pixels (tablet), 320x50 pixels (mobile)
- **Type**: Static or animated image, responsive
- **Content**: General advertisements or category-specific promotions
- **Pages**: Homepage, Category Listings, Individual Listings

**Bottom Banner**
- **Location**: Above the footer on all pages
- **Size**: 970x90 pixels (desktop), 728x90 pixels (tablet), 320x50 pixels (mobile)
- **Type**: Static or animated image, responsive
- **Content**: General advertisements or category-specific promotions
- **Pages**: Homepage, Category Listings, Individual Listings

### Sidebar Advertisements
```
+---------------------+
|                     |
|     SIDEBAR         |
|     ADVERTISEMENT   |
|     (300x600 or     |
|      300x250)       |
|                     |
|                     |
|                     |
|                     |
+---------------------+
```

**Right Sidebar**
- **Location**: Right side of content area on desktop, between content sections on mobile
- **Size**: 300x600 pixels (large rectangle), 300x250 pixels (medium rectangle)
- **Type**: Static or animated image
- **Content**: Category-specific or location-targeted advertisements
- **Pages**: Category Listings, Individual Listings

**Filter Sidebar**
- **Location**: Below filter options on category pages
- **Size**: 300x250 pixels
- **Type**: Static image
- **Content**: Category-specific advertisements
- **Pages**: Category Listings only

### Featured Listings
```
+------------------+
| [FEATURED BADGE] |
|                  |
| Business Name    |
| Category         |
| Location         |
| Rating           |
|                  |
| [VIEW DETAILS]   |
+------------------+
```

**Homepage Featured**
- **Location**: Dedicated "Featured Listings" section on homepage
- **Display**: 3-4 listings per row (desktop), 2 per row (tablet), 1 per row (mobile)
- **Badge**: Prominent "Featured" badge with distinct styling
- **Pages**: Homepage only

**Category Featured**
- **Location**: Top positions in category listing results
- **Display**: Highlighted background, larger cards, or distinctive styling
- **Badge**: "Featured" badge with distinct styling
- **Pages**: Category Listings only

### Sponsored Categories/Areas
```
+----------------------------------------------------------------------+
|                                                                      |
|  CATEGORY NAME                                [SPONSORED BY XYZ]     |
|                                                                      |
+----------------------------------------------------------------------+
```

**Category Sponsorship**
- **Location**: Next to category title on category pages
- **Display**: "Sponsored by [Business Name]" with optional small logo
- **Pages**: Category Listings

**Borough/Area Sponsorship**
- **Location**: Next to borough/area name in geographic navigation
- **Display**: "Sponsored by [Business Name]" with optional small logo
- **Pages**: Homepage, relevant Category Listings

### In-Content Advertisements
```
+----------------------------------------------------------------------+
|                                                                      |
|  SIMILAR BUSINESSES YOU MIGHT LIKE          [SPONSORED]              |
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  |                  |  |                  |  |                  |    |
|  | Business Name    |  | Business Name    |  | Business Name    |    |
|  | Category         |  | Category         |  | Category         |    |
|  | Location         |  | Location         |  | Location         |    |
|  |                  |  |                  |  |                  |    |
|  +------------------+  +------------------+  +------------------+    |
|                                                                      |
+----------------------------------------------------------------------+
```

**Related Listings**
- **Location**: "Similar Listings" section on individual listing pages
- **Display**: Mix of organic and sponsored recommendations
- **Label**: Subtle "Sponsored" label on paid placements
- **Pages**: Individual Listings

**Promoted Search Results**
- **Location**: Interspersed within regular search results
- **Display**: Similar to regular listings but with "Ad" or "Sponsored" label
- **Pages**: Search Results

## Ad Specifications

### Technical Specifications
- **File Formats**: JPG, PNG, GIF (static or animated), HTML5
- **Max File Size**: 150KB for images, 200KB for animated GIFs, 300KB for HTML5
- **Animation**: Maximum 15 seconds, no more than 3 loops
- **Resolution**: Minimum 72 DPI

### Content Guidelines
- **Content**: Must be relevant to the New York State audience
- **Prohibited**: Adult content, gambling, illegal products/services
- **Branding**: Clear business identification required
- **Call-to-Action**: Recommended but not required

## Monetization Strategy

### Pricing Models
1. **CPM (Cost Per Mille)**
   - Banner and sidebar advertisements
   - Rates vary by placement, size, and targeting options

2. **Flat Rate**
   - Featured listings (weekly, monthly, or annual packages)
   - Category/area sponsorships (monthly or annual packages)

3. **CPC (Cost Per Click)**
   - Option for banner and sidebar advertisements
   - Performance-based pricing for advertisers

### Tiered Advertising Packages

**Basic Package**
- Featured listing in one category
- Basic business profile
- Standard placement in search results

**Premium Package**
- Featured listing in multiple categories
- Enhanced business profile with photo gallery
- Premium placement in search results
- One sidebar advertisement (rotating)

**Elite Package**
- Featured listing in all relevant categories
- Premium business profile with video capability
- Top placement in search results
- Dedicated sidebar advertisement
- Category sponsorship option

## Responsive Behavior

### Desktop (1200px+)
- Full-size banners (970x90)
- Sidebar ads visible at all times (300x600)
- 3-4 featured listings per row

### Tablet (768px-1199px)
- Medium banners (728x90)
- Sidebar ads visible at all times (300x250)
- 2 featured listings per row

### Mobile (320px-767px)
- Small banners (320x50)
- Sidebar ads relocated between content sections
- 1 featured listing per row
- Reduced number of in-content ads

## Ad Management

### Admin Controls
- Enable/disable specific ad placements
- Schedule campaigns by date range
- Target ads by category, location, or user demographics
- Monitor performance metrics (impressions, clicks, CTR)
- A/B testing capabilities

### Advertiser Dashboard
- Campaign creation and management
- Performance analytics
- Budget control and spending limits
- Creative asset uploads and management

## Implementation Considerations

### Performance Optimization
- Lazy loading for below-the-fold advertisements
- Asynchronous loading to prevent page rendering delays
- Compression of ad assets for faster loading
- Fallback content for ad blockers

### User Experience
- Clear distinction between organic content and advertisements
- Non-intrusive ad placements that don't disrupt core functionality
- Mobile-friendly ad formats that don't consume excessive screen space
- Frequency capping to prevent ad fatigue

### Compliance
- GDPR and CCPA compliance for user tracking
- Clear disclosure of sponsored content
- Cookie consent mechanisms
- Privacy policy regarding ad targeting
