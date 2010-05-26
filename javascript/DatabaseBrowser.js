var timeout;

function msgbx(text,status) {
	var $ = jQuery;
	$('#ajax_msg').text(text);
	if(status == 'off') {
		$('#ajax_msg').hide('slow');
	} else {
		$('#ajax_msg').removeClass('good');
		$('#ajax_msg').removeClass('bad');
		$('#ajax_msg').removeClass('waiting');
 		$('#ajax_msg').addClass(status);
 		$('#ajax_msg').show('fast');
 	}
	if(status == 'good' || status == 'bad')
		timeout = setTimeout('msgbx("' + text + '", "off")', 3000);
}

(function($) {

	var kikeoptions = { dragOpacity: 0 }

	function initRight() {
		$('.tabtabs').each(function(){
			$(this).attr('href', '#' + $(this).attr('title'));
		});
		$("#tabs").tabs();
		$("#right table.kike").kiketable_colsizable(kikeoptions);
		setSizes();
	}

	function setSizes() {
		$('#dbb_table_list').height($('#left').innerHeight() - $('#lefthead').height());
		$('#tabs').height($('#right').height() - $('#right .main > h1').height() - parseInt($('#right .main > h1').css('marginTop')) - 26);
		$('.tabbody').height($('#tabs').height() - $('ul.ui-tabs-nav').height() - 23);
		$('.tabbody').width($('#tabs').width() - 26);
	}

	$(document).ready(function() {

		$('#dbb_table_list li').live('click', function() {
			$('#dbb_table_list li').removeClass('selected');
			$(this).addClass('selected');
			msgbx('loading table ' + $(this).text(), 'waiting');
			$('#right div.main').load($('a', this).attr('href'), function(){
				msgbx('loaded', 'good');
				initRight();
			});
			return false;
		});

		$('#lefthead').live('click', function() {
			$('#dbb_table_list li').removeClass('selected');
			msgbx('loading database ' + $(this).text(), 'waiting');
			$('#right div.main').load($('a', this).attr('href'), function(){
				msgbx('loaded', 'good');
				initRight();
			});
			return false;
		});

		$('#sql_form').live('submit', function() {
			msgbx('execute statement', 'waiting');
			$('#sql-tab').load($(this).attr('action'), $(this).serialize(),function(){
				$("#right table.kike").kiketable_colsizable(kikeoptions);
				msgbx('executed', 'good');
			});
			return false;
		});
		
		$('#browse-tab .pagination').live('click',function(){
			msgbx('loading...', 'waiting');
			$('#browse-tab').load($('a',this).attr('href'), function(){
				$("#right table.kike").kiketable_colsizable(kikeoptions);
				msgbx('loaded', 'good');
			});
			return false;
		});

		$('#browse-tab .fieldname a').live('click',function(){
			msgbx('loading...', 'waiting');
			$('#browse-tab').load($(this).attr('href'), function(){
				$("#right table.kike").kiketable_colsizable(kikeoptions);
				msgbx('loaded', 'good');
			});
			return false;
		});

		$('#browse-tab tbody tr').live('click',function(){
			$('#browse-tab tbody tr').removeClass('current');
			$(this).addClass('current');
			$(this).toggleClass('selected');
		});

		$('#browse-tab tbody tr').live('dblclick',function(){
			alert($('td', this).first().text());
		});

		$(window).bind('resize', function () { 
			setSizes();
		});

		$(window).bind('resize', function () { 
			setSizes();
		});
		
		$('#separator').bind('mouseup', function () { 
			setSizes();
		});
		
		initRight();

	});

})(jQuery);