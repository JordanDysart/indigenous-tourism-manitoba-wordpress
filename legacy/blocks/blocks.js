(function($) {
  $(document).ready(function() {
    REL.init();
  });

  var REL = {};
  REL.E = {};

  REL.init = function() {
    REL.initializeMapScript();
  };

  REL.initializeMapScript = function() {
    if (!window.WPLeafletMapPlugin || !window.WPLeafletMapPlugin.maps) {
      console.error("WPLeafletMapPlugin is not available.");
      return;
    }

    function waitForMapInitialization(retries = 10) {
      const maps = window.WPLeafletMapPlugin.maps;
      if (maps.length > 0 && maps[0]) {
        const leafletMap = maps[0];
        setupTabs(leafletMap);
      } else if (retries > 0) {
        setTimeout(() => waitForMapInitialization(retries - 1), 500);
      } else {
        console.error("Failed to initialize the map.");
      }
    }

    waitForMapInitialization();
  };

  function setupTabs(leafletMap) {
    const tabs = document.querySelectorAll(".operator-tab");
	const leafletMapElement = document.querySelector(".content-operators-map");

    tabs.forEach(tab => {
      tab.addEventListener("click", function() {
		
		if (window.innerWidth < 900) {
          if (leafletMapElement) {
            leafletMapElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else {
            console.error("Element with class 'content-operators-map' not found.");
          }
        }

        const lat = parseFloat(this.dataset.lat);
        const lng = parseFloat(this.dataset.lng);

        if (isNaN(lat) || isNaN(lng)) {
          console.error("Invalid coordinates:", lat, lng);
          return;
        }

        const tolerance = 0.001;

        leafletMap.flyTo([lat, lng], 17, {
          animate: true,
          duration: 1.5
        });

        leafletMap.once("moveend", function() {
          leafletMap.eachLayer(layer => {
            if (layer instanceof L.Marker) {
              const markerLatLng = layer.getLatLng();
              const latDiff = Math.abs(markerLatLng.lat - lat);
              const lngDiff = Math.abs(markerLatLng.lng - lng);

              if (latDiff <= tolerance && lngDiff <= tolerance) {
                const currentIcon = layer.getIcon();

                if (currentIcon && currentIcon.options.iconUrl) {
                  const resizedIcon = L.icon({
                    iconUrl: currentIcon.options.iconUrl,
                    iconSize: [100, 100],
                    iconAnchor: [50, 100],
                    shadowUrl: currentIcon.options.shadowUrl,
                    popupAnchor: currentIcon.options.popupAnchor,
                    shadowSize: [100, 100],
                    shadowAnchor: [50, 100]
                  });
                  layer.setIcon(resizedIcon);
                  layer.openPopup();
                } else {
                  console.error("Marker does not have a valid iconUrl.");
                }
              } else {
                const currentIcon = layer.getIcon();

                if (currentIcon && currentIcon.options.iconUrl) {
                  const defaultIcon = L.icon({
                    iconUrl:
                      currentIcon.options.iconUrl ||
                      "./operator_block/hoop-marker.png",
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    shadowUrl: currentIcon.options.shadowUrl,
                    popupAnchor: currentIcon.options.popupAnchor,
                    shadowSize: [50, 50],
                    shadowAnchor: [25, 50]
                  });
                  layer.setIcon(defaultIcon);
                  layer.closePopup();
                }
              }
            }
          });
        });

        tabs.forEach(t => {
          t.classList.remove("active-tab");
          t.style.maxHeight = "100px";
        });

        this.classList.add("active-tab");
        this.style.maxHeight = `${this.scrollHeight}px`;
      });
    });

    leafletMap.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        layer.on("click", function(e) {
          const marker = e.target;
          const currentIcon = marker.getIcon();

          if (currentIcon && currentIcon.options.iconUrl) {
            const resizedIcon = L.icon({
              iconUrl: currentIcon.options.iconUrl,
              iconSize: [100, 100],
              iconAnchor: [50, 100],
              shadowUrl: currentIcon.options.shadowUrl,
              popupAnchor: currentIcon.options.popupAnchor,
              shadowSize: [100, 100],
              shadowAnchor: [50, 100]
            });
            marker.setIcon(resizedIcon);

            leafletMap.flyTo(e.latlng, 17, {
              animate: true,
              duration: 1.5
            });

            marker.openPopup();
          } else {
            console.error("Marker does not have a valid iconUrl.");
          }
        });
      } else if (layer instanceof L.MarkerClusterGroup) {
        layer.eachLayer(function(marker) {
          marker.on("click", function(e) {
            const marker = e.target;
            const currentIcon = marker.getIcon();

            if (currentIcon && currentIcon.options.iconUrl) {
              const resizedIcon = L.icon({
                iconUrl: currentIcon.options.iconUrl,
                iconSize: [100, 100],
                iconAnchor: [50, 100],
                shadowUrl: currentIcon.options.shadowUrl,
                popupAnchor: currentIcon.options.popupAnchor,
                shadowSize: [100, 100],
                shadowAnchor: [50, 100]
              });
              marker.setIcon(resizedIcon);

              leafletMap.flyTo(e.latlng, 17, {
                animate: true,
                duration: 1.5
              });

              marker.openPopup();
            } else {
              console.error("Marker does not have a valid iconUrl.");
            }
          });
        });
      }
    });
  }
})(jQuery);
