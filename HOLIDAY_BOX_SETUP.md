# Holiday Box Product Setup Guide

This guide will walk you through creating the Holiday Box product in Sanity Studio.

## Prerequisites

1. Access to Sanity Studio (navigate to `/studio` on your site)
2. Holiday Box product image ready to upload

## Step 1: Upload the Holiday Box Image

1. Navigate to `/studio` on your site
2. In the left sidebar, you may need to go to the Media section or you can upload directly when creating the product
3. Prepare your Holiday Box image (recommended: high-quality JPG or PNG, at least 800x800px)
4. Save it as `holiday-box.jpg` in your `public/images/products/` folder for local reference

## Step 2: Create the Holiday Box Product in Sanity

1. Open Sanity Studio (`/studio`)
2. Click on **"Product"** in the left sidebar
3. Click **"Create New Document"** (the + button)
4. Fill in the following fields:

### Required Fields:

- **Product ID**: `prod_holiday_box` (or your Stripe product ID)
- **Product Name**: `Holiday Box`
- **Slug**: Click "Generate" next to the slug field (it should create `holiday-box`)
- **Product Images**: Upload your Holiday Box image
  - Click "Upload" and select your image
  - You can upload multiple images showing different angles
- **Price (in USD)**: `60.00`
- **Stripe Price ID**: Your Stripe price ID for this product (e.g., `price_xxxxxxxxxxxxx`)
  - ⚠️ **Important**: Create this price in your Stripe Dashboard first
- **Category**: Select **"Bundle"** from the dropdown

### Optional but Recommended:

- **Details**: Add a rich text description of what's included in the Holiday Box
  - Example: "The perfect gift for coffee lovers! This exclusive Holiday Box includes your choice of premium coffee, a comfortable Tre Stelle Coffee Co. t-shirt, and our signature coffee mug."

### Bundle-Specific Settings:

Under **Bundle Options** (this section appears after selecting "Bundle" category):

1. **Coffee Choices**: 
   - Click "Add item"
   - Select the coffee products customers can choose from (e.g., Ethiopian Yirgacheffe, Brazil Fazenda, Colombia Excelso, Highlands Blend)
   - Add all coffee options you want to offer

2. **Includes T-Shirt**: 
   - Check this box ✓
   - This will enable t-shirt size selection on the product page

3. **Includes Coffee Mug**: 
   - Check this box ✓
   - This indicates the bundle includes a coffee mug

### Featured Product:

- **Featured Product**: Check this box ✓
  - This will display the Holiday Box in the featured products carousel on the home page

### Stock Status:

- **Out of Stock**: Leave unchecked (only check if you run out of inventory)

## Step 3: Publish the Product

1. Review all the information
2. Click the **"Publish"** button in the bottom right corner
3. The product is now live!

## Step 4: Test the Product

1. Visit your website homepage
2. You should see the Holiday Box popup appear after 2 seconds
3. The Holiday Box should appear in the featured products section
4. Navigate to `/products/holiday-box` to see the product page
5. Test the customization options:
   - Select a t-shirt size
   - Choose a coffee option
   - Verify the coffee mug is shown as included
   - Add to cart and verify all options are captured

## Stripe Configuration

Before creating the product in Sanity, make sure you have:

1. **Created a Product in Stripe Dashboard**:
   - Go to Products in Stripe Dashboard
   - Create a new product called "Holiday Box"
   - Note the Product ID (starts with `prod_`)

2. **Created a Price for the Product**:
   - Set the price to $60.00 USD
   - Choose "One time" payment
   - Note the Price ID (starts with `price_`)

3. Use these IDs in the Sanity product fields

## Troubleshooting

### Product not showing in featured section
- Make sure the "Featured Product" checkbox is checked
- Verify the category is set to "Bundle"
- Try refreshing your browser cache

### Customization options not appearing
- Verify "Bundle Options" are properly filled out
- Make sure coffee products are selected in "Coffee Choices"
- Both "Includes T-Shirt" and "Includes Coffee Mug" should be checked

### Popup not appearing
- Clear your browser's sessionStorage (right-click > Inspect > Application > Session Storage > Clear)
- The popup only shows once per session

### Images not loading
- Verify the image was properly uploaded to Sanity
- Check that the image file size is reasonable (< 5MB recommended)
- Ensure the image format is JPG or PNG

## Product URL

Once published, your Holiday Box will be accessible at:
- Direct URL: `https://yourdomain.com/products/holiday-box`

## Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Verify all Stripe IDs are correct
3. Ensure you have proper permissions in Sanity Studio
4. Check that your product slug is exactly `holiday-box`

---

**Note**: The popup will automatically show to new visitors. If you want to test it multiple times, clear your session storage or use an incognito window.
