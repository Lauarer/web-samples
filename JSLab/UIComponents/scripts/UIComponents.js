//���ڸ���ID����ȡ����HTMLԪ�أ��ڵ㣩�Ŀ�ݺ���
function $(id)
{
	//Ĭ������������Ϊdocument
	var context = document;
	//���û�ָ���ض������������Ķ���������Ϊ����������
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementById(id);
}
//���ڸ�����������ȡ���HTMLԪ�أ����飩�Ŀ�ݺ���
function C$(className)
{
	//Ĭ������������Ϊdocument
	var context = document;
	//���û�ָ���ض������������Ķ���������Ϊ����������
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementsByClassName(className);
}
//���ڸ��ݱ�ǩ����ȡ���HTMLԪ�أ����飩�Ŀ�ݺ���
function T$(tagName)
{
    //Ĭ������������Ϊdocument
	var context = document;
	//���û�ָ���ض������������Ķ���������Ϊ����������
	if (arguments.length > 1)
	{
		context = arguments[1];
	}
	return context.getElementsByTagName(tagName);
}
//��ʾHTMLԪ��
function show(e)
{
	e.style.display = "block";
}

//����HTMLԪ��
function hide(e)
{
	e.style.display = "none";
}

//��ʼ��UI���
var initUIComponents = function()
{
	console.log("���ڳ�ʼ��UI���...");
	
	$("btnStart").onclick = function(event)
	{
		console.log("\"��ʼ\"��ť�����!");
		var indicator = $("indicator");
		var percent = 0;
		var timer = setInterval(function(){ 
		
			indicator.innerHTML = percent + "%";
			indicator.style.width = percent + "%";
			
			percent += 1;
			
			if (percent > 100)
			{
				clearInterval(timer);
			}
			
		}, 100);
	};
	
	var updateClock = function()
	{
		var currentTime = new Date();
		var hour24 = currentTime.getHours();
		var hour = (hour24 > 12 ? hour24 - 12: hour24);
		var minute = currentTime.getMinutes();
		var second = currentTime.getSeconds();
		
		var hourDeg = Math.ceil(hour / 12 * 360) + "deg";
		var minuteDeg = Math.ceil(minute / 60 * 360) + "deg";
		var secondDeg = Math.ceil(second / 60 * 360) + "deg";
		
		//console.log(hourDeg + "," + minuteDeg + "," + secondDeg);
		
		var hourElement = $("hour");
		var minuteElement = $("minute");
		var secondElement = $("second");
		
		hourElement.style.webkitTransform = "rotate(" + hourDeg + ")";
		minuteElement.style.webkitTransform = "rotate(" + minuteDeg + ")";
		secondElement.style.webkitTransform = "rotate(" + secondDeg + ")";
	};
	
	setInterval(updateClock, 1000);
	
	var makeTabs = function(tabsContainer)
	{
		uls = T$("ul",tabsContainer);
		
		navList = uls[0];
		contentList = uls[1];
		
		var links = T$("a",navList);
		var navItems = T$("li", navList);
		var contents = T$("li",contentList);
		
		navList.onclick = function(event)
		{
			
			for (var i = 0; i < links.length; i++)
			{
				hide(contents[i]);
				
				var currentItem = links[i].parentNode;
				currentItem.className = "";
				
				if (links[i] == event.target 
					|| navItems[i] == event.target)
				{
					show(contents[i]);
					currentItem.className = "active";
				}
			}
			event.preventDefault();
		}
		
	}
	
	makeTabs(C$("tabs")[0]);
	
	var insertTable = function (rows, cols, tableContainer)
	{
		var table = document.createElement("table");
		for (var r = 0; r < rows; r++)
		{
			var row = document.createElement("tr");
			for (var c = 0; c < cols; c++)
			{
				var col = document.createElement("td");
				col.innerHTML = (c + r * cols) + "";
				row.appendChild(col);
			}
			table.appendChild(row);
		}
		tableContainer.appendChild(table);
		
		table.ondblclick = function(event)
		{
			console.log(event.target.innerHTML);
			var textBox = document.createElement("input");
			textBox.value = event.target.innerHTML;
			textBox.type = "text";			
			textBox.style.width = "1em";
			
			textBox.onblur = function ()
			{
				event.target.innerHTML = this.value;
				//console.log(this);
				console.log(this == textBox);
				
				this.onblur = null;				
				if (this.parentNode != null)
				{
					this.parentNode.removeChild(this);
				}
			}
			event.target.innerHTML = "";	
			event.target.appendChild(textBox);
		}
	}
	
	insertTable(3,5,$("dynamicTable"));
	
	console.log("UI�����ʼ�����.");
}

initUIComponents();