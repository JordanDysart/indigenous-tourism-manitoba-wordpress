<div class="operator-search">
    <div class="custom-dropdown" id="operator_region_dropdown">
        <div class="dropdown-header">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="component-iconify MuiBox-root css-1l5emy iconify iconify--carbon" width="1.6em" height="1.6em" preserveaspectratio="xMidYMid meet" viewbox="0 0 32 32">
                <path fill="currentColor" d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"></path>
                <path fill="currentColor" d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"></path>
            </svg>

            <span id="selected_region">Region</span>
        </div>
        <div
            class="dropdown-options">
            <div class="dropdown-option" data-value="">None</div>
            <?php $operator_regions = get_terms('operator_region');
            foreach ($operator_regions as $region) {
                echo '<div class="dropdown-option" data-value="' . esc_attr($region->term_id) . '">' . esc_html($region->name) . '</div>';
            }
            ?>
        </div>
    </div>
    <div class="dropdown-divider"></div>
    <div class="custom-dropdown" id="operator_category_dropdown">
        <div class="dropdown-header">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="component-iconify MuiBox-root css-1l5emy iconify iconify--carbon" width="1.6em" height="1.6em" preserveaspectratio="xMidYMid meet" viewbox="0 0 32 32">
                <path fill="currentColor" d="M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z"></path>
            </svg>
            <span id="selected_category">Category</span>
        </div>
        <div
            class="dropdown-options">
            <div class="dropdown-option" data-value="">None</div>
            <?php $operator_cats = get_terms('operator_category');
            foreach ($operator_cats as $cat) {
                echo '<div class="dropdown-option" data-value="' . esc_attr($cat->term_id) . '">' . esc_html($cat->name) . '</div>';
            }
            ?>
        </div>
    </div>

    <input type="hidden" id="operator_category_select" name="operator_category_select"/>
    <input type="hidden" id="operator_region_select" name="operator_region_select"/>

    <button class="operator-search-btn" id="operator_search_btn"><svg class="operator-search-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="component-iconify MuiBox-root css-1t9pz9x iconify iconify--carbon" width="1.6em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"></path></svg></button>

</div>

<div id="operator_results"></div>


<script type="text/javascript">
    var adminAjaxUrl = "<?php echo admin_url('admin-ajax.php'); ?>";
</script>

