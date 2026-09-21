/**
 * Integrated Footer Newsletter AJAX Handler
 *
 * @package kiwatinook
 */

(function () {
  'use strict';

  function initNewsletterForm() {
    var form = document.getElementById('itm-newsletter-form');
    if (!form) {
      return;
    }

    var emailInput = document.getElementById('itm-newsletter-email');
    var submitBtn = document.getElementById('itm-newsletter-submit');
    var feedback = document.getElementById('itm-newsletter-feedback');
    var hpInput = document.getElementById('itm_hp_check');

    if (!emailInput || !submitBtn || !feedback) {
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = emailInput.value.trim();
      var hpVal = hpInput ? hpInput.value.trim() : '';

      // Reset feedback
      feedback.className = 'site-footer__feedback';
      feedback.textContent = '';
      feedback.style.display = 'none';

      // Client-side email validation
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        showFeedback(
          'Please enter a valid email address.',
          'is-error'
        );
        emailInput.focus();
        return;
      }

      // Set loading state
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      emailInput.disabled = true;

      // Determine endpoint and nonce
      var ajaxUrl = (window.kiwatinook && window.kiwatinook.ajaxurl) ? window.kiwatinook.ajaxurl : '/wp-admin/admin-ajax.php';
      var nonce = (window.kiwatinook && window.kiwatinook.newsletter_nonce) ? window.kiwatinook.newsletter_nonce : '';

      // Check for hidden nonce field fallback
      var nonceField = form.querySelector('[name="itm_newsletter_nonce_field"]');
      if (!nonce && nonceField) {
        nonce = nonceField.value;
      }

      var formData = new URLSearchParams();
      formData.append('action', 'itm_newsletter_signup');
      formData.append('email', email);
      formData.append('nonce', nonce);
      formData.append('hp_check', hpVal);

      fetch(ajaxUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: formData.toString()
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          resetLoadingState();

          if (data && data.success) {
            var msg = (data.data && data.data.message) ? data.data.message : 'Miigwech / Thank you for subscribing!';
            showFeedback(msg, 'is-success');
            emailInput.value = '';
          } else {
            var errMsg = (data && data.data && data.data.message) ? data.data.message : 'Unable to complete sign-up. Please try again later.';
            showFeedback(errMsg, 'is-error');
          }
        })
        .catch(function () {
          resetLoadingState();
          showFeedback('A network error occurred. Please check your connection and try again.', 'is-error');
        });
    });

    function resetLoadingState() {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      emailInput.disabled = false;
    }

    function showFeedback(text, typeClass) {
      feedback.textContent = text;
      feedback.className = 'site-footer__feedback is-visible ' + typeClass;
      feedback.style.display = 'block';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterForm);
  } else {
    initNewsletterForm();
  }
})();
