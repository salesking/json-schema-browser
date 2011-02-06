/**
 * Format a JSON Schema as HTML
 */
S2Html = (function() {

  // private vars / methods
  var _html = '';

  /**
  * @return Array[ [Int, String] ] Int place of the name in orig schema ary, String schema name
  * sorted by schema names ,
  */
  function _get_cats(){
    var names = [],
        i = 0;
    $.each(S2Html.schemas, function(){
      names.push([i, this.title]);  //[no in schemas array, schema name]
      i++;
    });
    names.sort( function(a,b){a = a[1];b = b[1]; return a == b ? 0 : (a < b ? -1 : 1)} );
    return names;
  }

  /**
  * @return Array[String] property names sorted
  */
  function _get_props(props){
    var names = []; 
    $.each(props, function(k,v){
      names.push(k);
    });
    names.sort();
    return names;
  }
  /**
  * @return Array[String] property names sorted
  */
  function _get_links(links){
    var names = [];
    
    $.each(links, function(){
      names.push(this.rel);
    });
    names.sort();
    return names;
  }
  /**
  * @return String html dl containing the property desription
  */
  function _get_prop_vals(vals){
    var html = '<dl class="prop_vals">';

    $.each(vals, function(k,v){
      html += '<dt>'+k+'</td>';
      html += '<dd>'+v+'</dd>';
    });
     html += '</dl>';
    return html;
  }
  //public
  return {
    // public attributes
    // set these right before the call to S2Html.out()
    schemas            : [],  // mandatory: a bunch of schemas
    //create the html
    out: function() {
      var names = _get_cats();
      _html += "<ul class='categories'>";
      //each schema
      $.each(names, function(){
        var cur_s = this;
        _html += "<li><h2 class='btn red'>"+cur_s[1]+"</h2><div class='col2'>";
        var props = _get_props(S2Html.schemas[cur_s[0]].properties);
        _html += "<ul class='properties'>";
        //add devider
//         _html += "<li class='devider'>Properties</li>";
        //properties
        $.each(props, function(){
          _html += "<li><h3 class='btn grey'>"+this+"</h3>";
          var vals = _get_prop_vals(S2Html.schemas[cur_s[0]].properties[this]);
          _html +=vals;
          _html += "</li>"; // close prop
        });
        _html += "</ul>"; // close props
        //links
        if(S2Html.schemas[cur_s[0]].links){
          var links = _get_links(S2Html.schemas[cur_s[0]].links);
          _html += "<ul class='links'>";
          $.each(links, function(){
            _html += "<li><h3 class='btn green'>"+this+"</h3>";
            _html += "</li>"; // close link
          });
          _html += "</ul>"; // close links
        } // if links
        _html += "</div>"; // close col2 div
      });
      _html += "</ul>"; // close cats
      return _html;
    }

  }
})();