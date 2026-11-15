/**
 * Explore Indigenous Member Event Space Booking Form Handler
 *
 * Implements accessible validation state synchronization (`aria-invalid`,
 * dynamic `aria-describedby` error linking, and polite live-region status
 * announcements) and AJAX submission to `itm_space_booking_request`.
 *
 * @package kiwatinook
 */

(function () {
  'use strict';

  function linkFieldError(control, showError) {
    var errorId = control.getAttribute('data-error');
    if (!errorId) {
      return;
    }

    var currentIds = (control.getAttribute('aria-describedby') || '')
      .split(/\s+/)
      .filter(function (id) {
        return id && id !== errorId;
      });

    if (showError) {
      currentIds.push(errorId);
    }

    if (currentIds.length > 0) {
      control.setAttribute('aria-describedby', currentIds.join(' '));
    } else {
      control.removeAttribute('aria-describedby');
    }
  }

  function isRadioGroupValid(form, name) {
    var radios = form.querySelectorAll('input[type="radio"][name="' + name + '"]');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    return false;
  }

  function validateControl(form, control) {
    if (!control || control.disabled || control.type === 'hidden') {
      return true;
    }

    if (control.name === 'hp_check') {
      return true;
    }

    if (control.type === 'radio') {
      if (!control.required) {
        return true;
      }
      return isRadioGroupValid(form, control.name);
    }

    var val = (control.value || '').trim();
    if (control.required && !val) {
      return false;
    }

    if (control.type === 'email' && val) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(val);
    }

    return control.validity ? control.validity.valid : true;
  }

  function applyFieldValidity(form, control, isValid) {
    var fieldContainer = control.closest('.booking-field');

    if (control.type === 'radio') {
      var groupRadios = form.querySelectorAll('input[type="radio"][name="' + control.name + '"]');
      groupRadios.forEach(function (radio) {
        radio.setAttribute('aria-invalid', isValid ? 'false' : 'true');
        linkFieldError(radio, !isValid);
      });
    } else {
      control.setAttribute('aria-invalid', isValid ? 'false' : 'true');
      linkFieldError(control, !isValid);
    }

    if (fieldContainer) {
      fieldContainer.classList.toggle('is-invalid', !isValid);
    }
  }

  function initSpaceBookingForm() {
    var forms = document.querySelectorAll('#itm-space-booking-form, .itm-space-booking-form');
    if (!forms || forms.length === 0) {
      return;
    }

    forms.forEach(function (form) {
      if (form.getAttribute('data-itm-booking-bound') === 'true') {
        return;
      }
      form.setAttribute('data-itm-booking-bound', 'true');

      var submitBtn = form.querySelector('button[type="submit"]');
      var submitBtnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
      var defaultBtnLabel = submitBtnText ? submitBtnText.textContent : 'Submit Booking Request';
      var feedback = form.querySelector('#itm-space-booking-feedback, .booking-form-feedback');
      var touchedControls = new WeakSet();

      function clearFeedback() {
        if (!feedback) {
          return;
        }
        feedback.className = 'booking-form-feedback';
        feedback.textContent = '';
      }

      function showFeedback(message, statusClass) {
        if (!feedback) {
          return;
        }
        feedback.textContent = message;
        feedback.className = 'booking-form-feedback is-visible ' + statusClass;
      }

      function setLoading(isLoading) {
        if (!submitBtn) {
          return;
        }
        submitBtn.classList.toggle('is-loading', isLoading);
        submitBtn.disabled = isLoading;
        submitBtn.setAttribute('aria-busy', isLoading ? 'true' : 'false');
        if (submitBtnText) {
          submitBtnText.textContent = isLoading ? 'Submitting Request...' : defaultBtnLabel;
        }
      }

      // Contextual validation after user interaction (blur / change / input)
      form.addEventListener(
        'blur',
        function (e) {
          var target = e.target;
          if (!target || !target.matches || !target.matches('input, select, textarea')) {
            return;
          }
          if (target.type === 'radio' || target.name === 'hp_check') {
            return;
          }
          if (touchedControls.has(target) || (target.value || '').trim() !== '') {
            applyFieldValidity(form, target, validateControl(form, target));
          }
        },
        true
      );

      form.addEventListener('input', function (e) {
        var target = e.target;
        if (!target || !target.matches || !target.matches('input, select, textarea')) {
          return;
        }
        touchedControls.add(target);
        if (target.getAttribute('aria-invalid') === 'true') {
          if (validateControl(form, target)) {
            applyFieldValidity(form, target, true);
          }
        }
      });

      form.addEventListener('change', function (e) {
        var target = e.target;
        if (!target || !target.matches || !target.matches('input, select, textarea')) {
          return;
        }
        touchedControls.add(target);
        applyFieldValidity(form, target, validateControl(form, target));
      });

      form.addEventListener('reset', function () {
        setTimeout(function () {
          var controls = form.querySelectorAll('input, select, textarea');
          controls.forEach(function (ctrl) {
            if (ctrl.type !== 'hidden' && ctrl.name !== 'hp_check') {
              ctrl.setAttribute('aria-invalid', 'false');
              linkFieldError(ctrl, false);
            }
          });
          form.querySelectorAll('.booking-field.is-invalid').forEach(function (field) {
            field.classList.remove('is-invalid');
          });
        }, 0);
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearFeedback();

        var controls = Array.prototype.slice.call(
          form.querySelectorAll('input:not([type="hidden"]), select, textarea')
        );
        var firstInvalid = null;
        var checkedRadioNames = {};

        controls.forEach(function (ctrl) {
          if (ctrl.name === 'hp_check') {
            return;
          }
          if (ctrl.type === 'radio') {
            if (checkedRadioNames[ctrl.name]) {
              return;
            }
            checkedRadioNames[ctrl.name] = true;
          }

          var valid = validateControl(form, ctrl);
          applyFieldValidity(form, ctrl, valid);
          if (!valid && !firstInvalid) {
            firstInvalid = ctrl;
          }
        });

        if (firstInvalid) {
          showFeedback(
            'Please complete all required fields highlighted above before submitting your booking request.',
            'is-error'
          );
          firstInvalid.focus();
          return;
        }

        setLoading(true);

        var ajaxUrl =
          (window.itmSpaceBooking && window.itmSpaceBooking.ajaxurl) ||
          (window.kiwatinook && window.kiwatinook.ajaxurl) ||
          form.getAttribute('action') ||
          '/wp-admin/admin-ajax.php';

        var nonceField = form.querySelector('[name="itm_space_booking_nonce_field"]');
        var nonce =
          (nonceField && nonceField.value) ||
          (window.itmSpaceBooking && window.itmSpaceBooking.nonce) ||
          '';

        var formData = new FormData(form);
        formData.set('action', 'itm_space_booking_request');
        if (nonce) {
          formData.set('nonce', nonce);
        }

        var encodedBody = new URLSearchParams();
        formData.forEach(function (value, key) {
          encodedBody.append(key, String(value));
        });

        fetch(ajaxUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: encodedBody.toString()
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (payload) {
            setLoading(false);

            if (payload && payload.success) {
              var confirmMsg =
                payload.data && payload.data.message
                  ? payload.data.message
                  : 'Miigwech / Thank you! Your Explore Indigenous event space request has been received.';
              form.reset();
              showFeedback(confirmMsg, 'is-success');
            } else {
              var errMsg =
                payload && payload.data && payload.data.message
                  ? payload.data.message
                  : 'Unable to submit your booking request right now. Please try again.';
              showFeedback(errMsg, 'is-error');

              if (payload && payload.data && payload.data.field) {
                var errField = form.querySelector('[name="' + payload.data.field + '"]');
                if (errField) {
                  applyFieldValidity(form, errField, false);
                  errField.focus();
                }
              }
            }
          })
          .catch(function () {
            setLoading(false);
            showFeedback(
              'A network error occurred while sending your request. Please check your connection or email ambassadormgr@indigenoustourismmanitoba.ca.',
              'is-error'
            );
          });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpaceBookingForm);
  } else {
    initSpaceBookingForm();
  }
})();
