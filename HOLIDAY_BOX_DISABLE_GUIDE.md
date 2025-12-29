# Holiday Box Disable Guide

## ✅ What Has Been Disabled in the Code

I've successfully disabled the Holiday Box from your website's frontend by making minimal code changes:

### 1. **Popup Disabled**
   - ✅ The Holiday Box popup has been commented out in `src/app/InnerLayoutClient.tsx`
   - The popup will no longer appear to visitors on your site
   - The code remains in place for easy re-enabling if needed in the future

### 2. **Featured Products Listing Disabled**
   - ✅ Updated the Sanity query in `components/ui/FeaturedProducts.tsx`
   - The Holiday Box (and any bundle products) will no longer appear in the featured products carousel on the home page
   - Only whole-bean coffee products will now be shown in the featured section

### Files Modified:
- `src/app/InnerLayoutClient.tsx` - Commented out `<HolidayBoxPopup />` component
- `components/ui/FeaturedProducts.tsx` - Updated query to exclude bundle products

## 🔍 What Still Needs Your Attention

### Important: The Holiday Box Product Page Still Exists

The product detail page at `/products/holiday-box` is **still accessible** if someone has the direct link. Here's what you should consider:

### Option 1: Hide in Sanity (Recommended - Quick & Reversible)
**This is the easiest approach and doesn't require additional code changes.**

1. **Go to Sanity Studio** (`/studio` on your website)
2. **Find the Holiday Box product**
3. **Uncheck "Featured Product"** (if checked)
4. **Mark as "Out of Stock"** ✓
   - This will prevent purchases while keeping the product in your database
   - The product page will show "OUT OF STOCK" instead of "Add to Cart"
5. **Save/Publish** the changes

**Advantages:**
- No data loss - product info and images remain in Sanity
- Easy to re-enable for next holiday season
- No Stripe configuration changes needed
- Direct link visitors will see it's unavailable

### Option 2: Archive in Sanity (More Complete)
**If you want to completely hide the product from all listings:**

1. **Go to Sanity Studio**
2. **Find the Holiday Box product**
3. **Add a new field or tag** (you may need to update schema) to mark it as "archived"
4. **OR** simply unpublish/delete the product document
   - ⚠️ Warning: Deleting will lose all product data

**Advantages:**
- Product completely removed from any potential queries
- Cleaner database if you're sure you won't need it again

**Disadvantages:**
- If deleted, you'll need to recreate everything next season
- Unpublishing may cause 404 errors if direct links exist

## 💳 Stripe Configuration

### Do You Need to Disable in Stripe?

**Short Answer: Not necessarily, but you can.**

#### What Happens If You Leave It Active:
- The Stripe product and price will remain available in your Stripe Dashboard
- Since the product is hidden from your website, customers can't reach the checkout
- No impact on your site's functionality
- Stripe won't charge you for inactive products

#### If You Want to Disable in Stripe:
1. **Go to Stripe Dashboard** → Products
2. **Find "Holiday Box"** product
3. **Archive the product**
   - This hides it from active products list
   - All historical data and transactions remain
   - Easy to unarchive later

**Recommendation:** Archive it in Stripe for a cleaner dashboard, but it's not required for the site to function correctly.

## 📊 What About Past Orders?

### Customer Order History
- Past orders containing the Holiday Box will remain in your order history
- Customer receipts and invoices are not affected
- Stripe will maintain all transaction records

### Analytics & Reporting
- Sales data for the Holiday Box period will remain available
- This is helpful for planning next year's holiday promotion

## 🔄 Re-enabling for Next Season

When the next holiday season arrives, you can easily re-enable everything:

### In the Code:
1. **Uncomment the popup** in `src/app/InnerLayoutClient.tsx`:
   ```typescript
   {!isStudioPage && <HolidayBoxPopup />}
   ```

2. **Update the query** in `components/ui/FeaturedProducts.tsx`:
   ```typescript
   const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && (category == "whole-bean" || (category == "bundle" && isFeatured == true))][0...4] | order(_createdAt desc){...}`;
   ```

### In Sanity:
1. Mark the product as "In Stock"
2. Check "Featured Product" if you want it in the carousel
3. Update any seasonal messaging or prices

### In Stripe:
1. Unarchive the product (if you archived it)
2. Or create a new product for the new season

## ✅ Current State Summary

| Component | Status | Location |
|-----------|--------|----------|
| Popup | ✅ Disabled | Code (commented out) |
| Featured Carousel | ✅ Disabled | Code (query updated) |
| Product Page | ⚠️ Still Accessible | Direct URL `/products/holiday-box` |
| Sanity Product | ℹ️ Your Action Needed | Mark as out of stock or unpublish |
| Stripe Product | ℹ️ Optional | Can archive for cleaner dashboard |

## 🎯 Recommended Next Steps

1. **Right Now:**
   - Go to Sanity Studio and mark Holiday Box as "Out of Stock"
   - This prevents any purchases if someone finds the direct link

2. **Optional:**
   - Archive the Stripe product for a cleaner dashboard
   - Add a note in your calendar for next holiday season

3. **Later (Next Season):**
   - Re-enable the code (uncomment and update query)
   - Mark product as "In Stock" in Sanity
   - Unarchive in Stripe if needed

## 📝 Notes

- All changes made to the code are **minimal and reversible**
- The Holiday Box component file (`components/ui/HolidayBoxPopup.tsx`) remains untouched for future use
- Setup documentation files remain for reference when re-enabling

---

**Need Help?** If you have questions about any of these steps, feel free to reach out!
