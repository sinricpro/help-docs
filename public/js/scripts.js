function openLanguage(evt, language) {
  // Get the language code (e.g., "nl-NL" from "alexa-nl-NL" or "gh-nl-NL")
  var langCode = language.split('-').slice(1).join('-');
  var section = language.split('-')[0]; // "alexa" or "gh"
  
  // Hide all tab content
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Remove active class from all tabs
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the clicked tab content
  document.getElementById(language).style.display = "block";
  
  // Add active class to the clicked tab
  evt.currentTarget.className += " active";
  
  // Synchronize with the corresponding tab in the other section
  var otherSection = (section === "alexa") ? "gh" : "alexa";
  var otherTabId = otherSection + "-" + langCode;
  
  // Check if the corresponding tab exists in the other section
  if (document.getElementById(otherTabId)) {
    // Show the corresponding tab content
    document.getElementById(otherTabId).style.display = "block";
    
    // Find and activate the corresponding tab button
    var otherTabLinks = document.querySelectorAll('button[onclick*="' + otherTabId + '"]');
    if (otherTabLinks.length > 0) {
      otherTabLinks[0].className += " active";
    }
  }
}
