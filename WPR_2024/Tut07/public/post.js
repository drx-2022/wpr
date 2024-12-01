/*
 * Sending POST request with fetch
 */
"use strict";
(function () {
  // TODO: change the port 3000 to your port (if you're using a different one)
  const API_URL = "http://localhost:3000/login";

  window.addEventListener("load", init);

  /**
   * setup the sign-in button on initial page load
   * and form submit event handler
   */
  function init() {
    qs("form").addEventListener("submit", signIn);
  }

  /**
   * Signs the user in based on username and password inputs
   */
  async function signIn(e) {
    e.preventDefault();
    let user = id("username").value;
    let password = id("password").value;
    let data = new URLSearchParams();
    data.append("user", user);
    data.append("password", password);

    try {
      let response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      });
      response = await statusCheck(response);
      let text = await response.text();
      id("response").textContent = text;
    } catch (e) {
      id("response").textContent = "Sorry, user. An error has happened!";
      console.log(e);
    }
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the element that has the matches the selector passed.
   * @param {string} selector - selector for element
   * @return {object} DOM object associated with selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();
