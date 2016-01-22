//1:not have number yet, 2: have one number, and set calculate type
//3: have one number, input second number, 4:have a result, but it can reflush to new calculation
var state = 1;

//for screen modify and update
var screennow = '';
var have_dot=false;
var last_cal_type = '';

//for calculation
//result = A operator B
var result = 0.0;
var value_A = 0.0;
var value_B = 0.0;


function state_control(i) {
    //console.log(state,'->',i);
    state = i;
}

function update_screen(s) {
    $("#sc").html(s);
}



function save_A(str) {
    value_A = parseFloat(str);
    //console.log(value_A);
}

function save_B(str) {
    value_B = parseFloat(str);
    //console.log(value_B);
}

function func_AC() {
    state_control(1);
    result = 0.0;
	save_A(0.0);
	save_B(0.0);
    screennow = '0';
    have_dot=false;
    update_screen(0);
}

function func_CE() {
    screennow = '0';
    update_screen(0);
    have_dot=false;
    save_B(parseFloat(screennow));
}

function func_n(i) {
    if (state === 1 ) {
        if (screennow === '0') screennow = i;
        else screennow += i;
        update_screen(screennow);
        save_B(parseFloat(screennow));
    } else if (state === 2) {
        screennow = i;
        update_screen(screennow);
        save_B(parseFloat(screennow));
        state_control(3);
    } else if (state === 3) {
        if (screennow === '0') screennow = i;
        else screennow += i;
        update_screen(screennow);
        save_B(parseFloat(screennow));
    } else if (state ===4) {
    	screennow='';
    	screennow += i;
    	update_screen(screennow);
    	save_B(parseFloat(screennow));
    	state_control(1);
    }
}

function func_dot() {
	if(!have_dot)
	{
		have_dot=true;
		if(screennow==='')screennow+='0';
		screennow +='.';
		update_screen(screennow);
		save_B(parseFloat(screennow));
	}
}

function func_equal() {
    if (state === 3) {
        console.log('equal:',value_A, last_cal_type, value_B);
        if (last_cal_type === 'plus')
            result = value_A + value_B;
        if (last_cal_type === 'minus')
            result = value_A - value_B;
        if (last_cal_type === 'mod')
            result = value_A % value_B;
        if (last_cal_type === 'divi')
            result = value_A / value_B;
        if (last_cal_type === 'multip')
            result = value_A * value_B;
        update_screen(String(result));
        console.log('result:',result);
        save_A(result);
        state_control(4);
    }
}

function operator(str) {
	have_dot=false;
    if (str !== "plus" && str !== 'minus' && str != 'mod' && str != 'divi' && str != 'multip') {
        try{
        	throw "Invalid Operator";
        }
        catch(e){
    		console.log(e);
    	}
    } else if (state === 1) {
        save_A(value_B);
        save_B(0.0);
        last_cal_type = str;
        state_control(2);
    } else if (state === 3) {
    	//console.log(value_A,last_cal_type,value_B);
        switch (last_cal_type) {
            case 'plus':
                result = value_A + value_B;
                break;
            case 'minus':
                result = value_A - value_B;
                break;
            case 'mod':
                result = value_A % value_B;
                break;
            case 'divi':
                result = value_A / value_B;
                break;
            case 'multip':
                result = value_A * value_B;
                break;
        }
        last_cal_type= str;
		state_control(2);
        save_A(result);
    } else if (state === 4)
    {
    	last_cal_type = str;
    	state_control(2);
    }
    
}
