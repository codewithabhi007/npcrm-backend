# Nayaa Property Backend - API Development Plan

## Overview
This document tracks the development progress of APIs for the Nayaa Property homepage and related features.

---

## Phase 1: Core Entities and Database Structure

### ✅ Completed
- [x] User Entity (Auth Module)
- [x] Authentication System (JWT)
- [x] Project Entity with all fields (price, sqft, BHK options, images, status, etc.)
- [x] Locality Entity
- [x] Developer/Builder Entity
- [x] Blog Entity
- [x] Testimonial Entity
- [x] Partner Entity
- [x] Project Module (Service, Controller, DTOs)
- [x] Locality Module (Service, Controller, DTOs)
- [x] Developer Module (Service, Controller, DTOs)
- [x] Blog Module (Service, Controller, DTOs)
- [x] Testimonial Module (Service, Controller, DTOs)
- [x] Partner Module (Service, Controller, DTOs)
- [x] Statistics Module (Service, Controller)
- [x] All modules registered in AppModule

### ⏳ Pending
- [ ] Requirement Module (Post Requirement feature)
- [ ] Referral Module (Refer & Earn feature)
- [ ] Favorites Module (User favorites for projects)

---

## Phase 2: Homepage APIs

### Search & Filter APIs
- [x] `GET /api/v1/projects/search` - Search projects with filters
- [x] `GET /api/v1/projects/filters` - Get available filter options

### Project Listing APIs
- [x] `GET /api/v1/projects/recommended` - Recommended/Featured projects
- [x] `GET /api/v1/projects/newly-launched` - Newly launched projects
- [x] `GET /api/v1/projects/trending` - Trending projects
- [x] `GET /api/v1/projects/by-locality/:localityId` - Projects grouped by locality
- [x] `GET /api/v1/projects/:id` - Get single project details

### Locality APIs
- [x] `GET /api/v1/localities` - List all localities
- [x] `GET /api/v1/localities/:id` - Get locality details with projects

### Statistics API
- [x] `GET /api/v1/statistics` - Get platform statistics

### Content APIs
- [x] `GET /api/v1/blogs` - List blog posts
- [x] `GET /api/v1/blogs/:id` - Get single blog post
- [x] `GET /api/v1/testimonials` - List testimonials
- [x] `GET /api/v1/partners` - List partners

### Aggregate API
- [ ] `GET /api/v1/homepage` - Get all homepage data in one call (optional)

---

## Phase 3: Additional Features

### User Favorites
- [ ] `POST /api/v1/projects/:id/favorite` - Add/Remove favorite
- [ ] `GET /api/v1/projects/favorites` - Get user's favorite projects

### Post Requirement
- [ ] `POST /api/v1/requirements` - Submit property requirement
- [ ] `GET /api/v1/requirements` - Get user's requirements (authenticated)

### Refer & Earn
- [ ] `POST /api/v1/referrals` - Create referral
- [ ] `GET /api/v1/referrals` - Get user's referrals

---

## Phase 4: Admin APIs (Future)

- [ ] Project CRUD operations
- [ ] Content management (blogs, testimonials, partners)
- [ ] Statistics management
- [ ] User management

---

## Database Schema

### Entities Created
1. **User** ✅
   - id, first_name, last_name, email, password

### Entities Created
2. **Project** ✅
   - id, name, description, price_min, price_max, sqft_min, sqft_max
   - bhk_options, images[], status, locality_id, developer_id
   - created_at, updated_at, is_featured, is_new, view_count, favorite_count

3. **Locality** ✅
   - id, name, city, image, description, created_at, updated_at

4. **Developer** ✅
   - id, name, logo, description, contact_info, created_at, updated_at

5. **Blog** ✅
   - id, title, content, image, author, published_date, is_published, created_at, updated_at

6. **Testimonial** ✅
   - id, client_name, profession, location, rating, review_text, image, is_active, created_at

7. **Partner** ✅
   - id, name, logo, description, partner_type, is_active, created_at, updated_at

8. **Requirement** (Future)
   - id, user_id, property_type, budget_min, budget_max, location, bhk, status

9. **Referral** (Future)
   - id, referrer_id, referred_email, status, reward_amount, created_at

10. **ProjectFavorite** (Future)
    - id, user_id, project_id, created_at

---

## API Endpoints Summary

### Base URL: `/api/v1`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/projects/search` | Search projects | No |
| GET | `/projects/recommended` | Recommended projects | No |
| GET | `/projects/newly-launched` | Newly launched projects | No |
| GET | `/projects/trending` | Trending projects | No |
| GET | `/projects/by-locality/:localityId` | Projects by locality | No |
| GET | `/projects/:id` | Project details | No |
| GET | `/localities` | List localities | No |
| GET | `/localities/:id` | Locality details | No |
| GET | `/statistics` | Platform statistics | No |
| GET | `/blogs` | List blogs | No |
| GET | `/blogs/:id` | Blog details | No |
| GET | `/testimonials` | List testimonials | No |
| GET | `/partners` | List partners | No |
| POST | `/projects/:id/favorite` | Toggle favorite | Yes |
| GET | `/projects/favorites` | User favorites | Yes |
| POST | `/requirements` | Post requirement | Yes |
| GET | `/requirements` | User requirements | Yes |
| POST | `/referrals` | Create referral | Yes |
| GET | `/referrals` | User referrals | Yes |

---

## Progress Log

### 2024 - Development Started

#### Phase 1 Completed ✅
- ✅ Auth module completed (User entity, JWT authentication)
- ✅ All core entities created:
  - Project entity with relationships to Locality and Developer
  - Locality entity with one-to-many relationship to Projects
  - Developer entity with one-to-many relationship to Projects
  - Blog entity with published status
  - Testimonial entity with rating system
  - Partner entity with type enum (BUILDER, BANK, NBFC, INTERIOR, LAWYER, OTHER)
- ✅ All core modules implemented:
  - Project Module: Full CRUD, search, filters, recommended, newly-launched, trending
  - Locality Module: CRUD operations
  - Developer Module: CRUD operations
  - Blog Module: List and detail endpoints with pagination
  - Testimonial Module: List and detail endpoints with pagination
  - Partner Module: List and detail endpoints
  - Statistics Module: Aggregated statistics from all modules
- ✅ Search and filter APIs implemented with:
  - Full-text search on project name, locality, developer
  - Price range filtering
  - Sqft range filtering
  - BHK filtering
  - City and locality filtering
  - Developer filtering
  - Pagination support
- ✅ Homepage listing APIs implemented:
  - Recommended/Featured projects
  - Newly launched projects
  - Trending projects (based on view_count and favorite_count)
  - Projects by locality
- ✅ Statistics API implemented with counts for:
  - Total projects
  - Total builders/developers
  - Interior decoration partners
  - Banks/NBFCs
  - Team partners
  - Lawyers
- ✅ All modules registered in AppModule
- ✅ Swagger documentation configured for all endpoints

#### Next Steps (Phase 3)
- [ ] User favorites functionality
- [ ] Post requirement feature
- [ ] Refer & Earn feature
- [ ] Optional: Homepage aggregate API

---

## Implementation Details

### Database Relationships
- **Project** → **Locality** (Many-to-One)
- **Project** → **Developer** (Many-to-One)
- **Locality** → **Projects** (One-to-Many)
- **Developer** → **Projects** (One-to-Many)

### Key Features Implemented
1. **Project Search**: Advanced search with multiple filters (price, sqft, BHK, city, locality, developer)
2. **Project Filtering**: Dynamic filter options API that returns available cities, localities, developers, BHK options, and price/sqft ranges
3. **Project Status**: Enum-based status system (UPCOMING, ONGOING, COMPLETED, LAUNCHED)
4. **Featured Projects**: Boolean flag for recommended projects
5. **New Projects**: Boolean flag for newly launched projects
6. **Trending Algorithm**: Based on view_count and favorite_count
7. **Pagination**: Implemented for search results and blog/testimonial listings
8. **View Tracking**: Automatic view count increment when project details are viewed

### API Response Formats
- **Search Results**: `{ data: [], total: number, page: number, limit: number, totalPages: number }`
- **List Endpoints**: Paginated responses with metadata
- **Detail Endpoints**: Single object with related entities (locality, developer)

## Notes
- All timestamps use UTC
- Pagination: Default page size 10, max 50
- Image uploads: URLs stored as strings (file upload service to be implemented separately)
- Search: Full-text search on project names, localities, and developers using ILIKE for case-insensitive matching
- BHK Filtering: Uses LIKE pattern matching on array field
- TypeORM: Using QueryBuilder for complex search queries
- Swagger: All endpoints documented with @ApiTags, @ApiOperation, and @ApiResponse decorators
