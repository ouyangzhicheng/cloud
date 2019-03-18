
// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
throw new Error('AdminLTE requires jQuery')
}

/* Tree()
 * ======
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+function ($) {
  'use strict'

  var DataKey = 'lte.tree'

  var Default = {
    animationSpeed: 500,
    accordion     : true,
    followLink    : false,
    trigger       : '.treeview a'
  }

  var Selector = {
    tree        : '.tree',
    treeview    : '.treeview',
    treeviewMenu: '.treeview-menu',
    open        : '.menu-open, .active',
    li          : 'li',
    data        : '[data-widget="tree"]',
    active      : '.active'
  }

  var ClassName = {
    open: 'menu-open',
    tree: 'tree',
    active: 'active'
  }

  var Event = {
    collapsed: 'collapsed.tree',
    expanded : 'expanded.tree'
  }

  // Tree Class Definition
  // =====================
  var Tree = function (element, options) {
    this.element = element
    this.options = options

    $(this.element).addClass(ClassName.tree)

    $(Selector.treeview + Selector.active, this.element).addClass(ClassName.open)

    this._setUpListeners()
  }

  Tree.prototype.toggle = function (link, event) {
    var treeviewMenu = link.next(Selector.treeviewMenu)
    var parentLi     = link.parent()
    var isOpen       = parentLi.hasClass(ClassName.open)

    if (!parentLi.is(Selector.treeview)) {
      return
    }

    if (!this.options.followLink || link.attr('href') == '#') {
      event.preventDefault();
    }

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi)
    } else {
      this.expand(treeviewMenu, parentLi)
    }
  }

  Tree.prototype.expand = function (tree, parent) {
    var expandedEvent = $.Event(Event.expanded)

    if (this.options.accordion) {
      var openMenuLi = parent.siblings(Selector.open)
      var openTree   = openMenuLi.children(Selector.treeviewMenu)
      this.collapse(openTree, openMenuLi)
    }

    parent.addClass(ClassName.open)
//  tree.slideDown(this.options.animationSpeed, function () {   //当启动收起展开特效时需要开启本js
//    $(this.element).trigger(expandedEvent)
//  }.bind(this))
  }

  Tree.prototype.collapse = function (tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed)
    var obj = tree.find(Selector.open);
    obj.removeClass(ClassName.open)
    parentLi.removeClass(ClassName.open)
//  tree.slideUp(this.options.animationSpeed, function () {  //当启动收起展开特效时需要开启本js
//    obj.find(Selector.treeviewMenu).slideUp()
//    $(this.element).trigger(collapsedEvent)
//  }.bind(this))
  }

  // Private

  Tree.prototype._setUpListeners = function () {
    var that = this

    $(this.element).on('click', this.options.trigger, function (event) {
      that.toggle($(this), event)
    })
  }

  // Plugin Definition
  // =================
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data(DataKey)

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option == 'object' && option)
        $this.data(DataKey, new Tree($this, options))
      }
    })
  }

  var old = $.fn.tree

  $.fn.tree             = Plugin
  $.fn.tree.Constructor = Tree

  // No Conflict Mode
  // ================
  $.fn.tree.noConflict = function () {
    $.fn.tree = old
    return this
  }

  // Tree Data API
  // =============
  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this))
    })
  })

}(jQuery)
//$(".treeview-menu li a").on('click', function (event) {   //当启动收起展开特效时需要开启本js
//	  $(".treeview-menu li a").removeClass("active");
//	  $(this).addClass("active");
//    event.preventDefault();
//})
$(".treeview-menu li a,a.menuindex").on('click', function (event) { //当启动收起展开特效时需要关闭本js
	  $(".treeview-menu li a,a.menuindex").removeClass("active");
	  $(this).addClass("active");
      event.preventDefault();
})
function triggersidebar(num1,num2){
	if(!isNaN(parseInt(num1))){
		var check = $(".sidebar-menu>li:eq("+(parseInt(num1)-1)+")").hasClass("menu-open");
		if(!check){
			$(".sidebar-menu>li:eq("+(parseInt(num1)-1)+")>a").trigger("click");
		}
	}
	if(!isNaN(parseInt(num2))){
		$(".sidebar-menu>li:eq("+(parseInt(num1)-1)+")>.treeview-menu>li:eq("+(parseInt(num2)-1)+")>a").trigger("click");
	}
}
