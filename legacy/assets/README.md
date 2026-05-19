
# ITM IndigPro Theme Frontend

This README provides instructions for setting up and running the frontend for the `itm_indigpro` WordPress theme. The main assets for development are located in the `assets` directory, which contains all necessary files for compiling styles and managing other frontend tasks.

## Requirements

- **Node.js** version >= 18
- **Gulp** installed globally (if not installed, run `npm install -g gulp`)

## Installation and Setup

1. **Navigate to the Theme Directory**

   Ensure you’re in the root of the `itm_indigpro` theme directory, then go to the `assets` folder.

2. **Install Dependencies**

   Run the following command inside the `assets` folder to install all necessary npm packages:

   ```bash
   cd assets
   npm install`` 

3. **Compile Styles and Assets**

    After installing the dependencies, run Gulp to build and compile the styles:
    This command compiles styles from the `less` files within the `assets/css` directory.

    ```bash
    gulp
 

## File Structure

- **`assets/less/`**  
    This directory contains all editable source files for styles, organized into folders according to their context (e.g., components, layout, utilities). Modify these files as needed, and then run `gulp` to compile the updated styles.

- **`assets/css/`**  
    The compiled CSS files are generated here. These files are built automatically when running the Gulp tasks and should not be edited directly.

## Additional Information

- Any changes in the `less` files require re-running the Gulp tasks to ensure your changes are reflected in the compiled CSS.
- Make sure you’re using Node.js version 18 or above for compatibility with the latest packages in this theme setup.

## Common Commands

- **Install Dependencies**

    ```bash
    `npm install` 
    
- **Compile Styles**

  ``bash

    `gulp`

Now you’re ready to develop and manage the frontend assets for the `itm_indigpro` theme.
