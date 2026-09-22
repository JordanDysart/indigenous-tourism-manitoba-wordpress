/**
 * Integrated Footer Newsletter AJAX Handler
 *
 * @package kiwatinook
 */

(function () {
  'use strict';

  function initNewsletterForm() {
    var forms = document.querySelectorAll('#itm-newsletter-form, .itm-newsletter-form');
    if (!forms || forms.length === 0) {
      return;
    }

    forms.forEach(function (form) {
      if (form.getAttribute('data-itm-bound')) {
        return;
      }
      form.setAttribute('data-itm-bound', 'true');

      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('button[type="submit"]');
      var feedback = form.querySelector('.site-footer__feedback, .newsletter-archive__feedback') || form.querySelector('[role="status"]');
      var hpInput = form.querySelector('input[name="itm_hp_check"]');

      if (!emailInput || !submitBtn || !feedback) {
        return;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = emailInput.value.trim();
        var hpVal = hpInput ? hpInput.value.trim() : '';

        // Reset feedback
        feedback.className = feedback.className.replace(/\bis-(success|error|visible)\b/g, '').trim();
        feedback.textContent = '';
        feedback.style.display = 'none';

        // Client-side email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
          showFeedback('Please enter a valid email address.', 'is-error');
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
        var nonceField = form.querySelector('[name="itm_newsletter_nonce_field"]') || form.querySelector('[name="_wpnonce"]');
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

        function resetLoadingState() {
          submitBtn.classList.remove('is-loading');
          submitBtn.disabled = false;
          emailInput.disabled = false;
        }

        function showFeedback(text, typeClass) {
          feedback.textContent = text;
          feedback.className = (feedback.className + ' is-visible ' + typeClass).trim();
          feedback.style.display = 'block';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNewsletterForm);
  } else {
    initNewsletterForm();
  }
})();
