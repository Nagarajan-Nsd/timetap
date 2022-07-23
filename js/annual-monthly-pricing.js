var activeClass = 'monthly';
var annualPricing = {
	'teamBusinessPlan': '67',
	'teamBusinessPlanCents': '.45/mo',
	'soloBusinessPlan': '40',
	'soloBusinessPlanCents': '.45/mo',
	'teamProfessionalPlan': '35',
	'soloProfessionalPlan': '22',
	'soloProfessionalPlanCents': '.45/mo',
	'teamBusinessAddOns': '22.50',
	'teamProfessionalAddOns': '13.50',
}
var monthlyPricing = {
	'teamBusinessPlan': '74',
	'teamBusinessPlanCents': '.95/mo',
	'soloBusinessPlan': '44',
	'soloBusinessPlanCents': '.95/mo',
	'teamProfessionalPlan': '39',
	'soloProfessionalPlan': '24',
	'soloProfessionalPlanCents': '.95/mo',
	'teamBusinessAddOns': '25',
	'teamProfessionalAddOns': '15',
}
var locationValue = 1;
var staffValue = 1;

var fillInnerHTML = function(pricing){
	$('#teamBusinessPlan').text(pricing.teamBusinessPlan);
	$('#teamBusinessPlanCents').text(pricing.teamBusinessPlanCents);
	$('#soloBusinessPlan').text(pricing.soloBusinessPlan);
	$('#soloBusinessPlanCents').text(pricing.soloBusinessPlanCents);
	$('#teamProfessionalPlan').text(pricing.teamProfessionalPlan);
	$('#soloProfessionalPlan').text(pricing.soloProfessionalPlan);
	$('#soloProfessionalPlanCents').text(pricing.soloProfessionalPlanCents);
	$('.teamBusinessAddOns').text(pricing.teamBusinessAddOns);
	$('.teamProfessionalAddOns').text(pricing.teamProfessionalAddOns);
}

var switchPricing = function(id, idOff){
	$('#' + id).toggleClass('active');
	if(idOff !== undefined){
		$('#' + idOff).toggleClass('active');	
	}
	activeClass = id;
	if(activeClass === 'annual'){
		fillInnerHTML(annualPricing);
	} else if(activeClass === 'monthly'){
		fillInnerHTML(monthlyPricing);
	}
}
	
var goToSignUp = function(plan, activeClass, enterprisePlan){
	if(activeClass === 'annual'){
		plan = plan + 'A';
	} else {
		plan = plan + 'M';
	}
	if(enterprisePlan !== undefined){
		window.location = 'https://www.timetap.com/businessWeb/web/signup/' + plan + '?ent=' + enterprisePlan;
	} else {
		window.location = 'https://www.timetap.com/businessWeb/web/signup/' + plan;	
	}
	
}

var calculatePricing = function(locationValue, staffValue){
	var soloBusinessAnnualPricingByMonth = annualPricing.soloBusinessPlan + '.45';
	var soloProfessionalAnnualPricingByMonth = annualPricing.soloProfessionalPlan + '.45';
	var soloBusinessAnnualPricingByYear = Number(soloBusinessAnnualPricingByMonth) * 12, soloBusinessAnnualPricingByYear = Math.round(soloBusinessAnnualPricingByYear * 100) / 100;
	var soloProfessionalAnnualPricingByYear = Number(soloProfessionalAnnualPricingByMonth) * 12, soloProfessionalAnnualPricingByYear = Math.round(soloProfessionalAnnualPricingByYear * 100) / 100;;
	var soloBusinessMonthlyPricing = monthlyPricing.soloBusinessPlan + '.95';
	var soloProfessionalMonthlyPricing = monthlyPricing.soloProfessionalPlan + '.95';
	if(locationValue > 1 || staffValue > 1){
		$('#soloBusinessAnnual').text("N/A");
		$('#soloProfessionalAnnual').text("N/A");
		$('#soloBusinessMonthly').text("N/A");
		$('#soloProfessionalMonthly').text("N/A");
		$('.starterPlanAvailable').text("N/A");
	} else {
		$('#soloBusinessAnnual').text("$" + soloBusinessAnnualPricingByMonth + "/month ($" + soloBusinessAnnualPricingByYear + " per year)");	
		$('#soloProfessionalAnnual').text("$" + soloProfessionalAnnualPricingByMonth + "/month ($" + soloProfessionalAnnualPricingByYear + " per year)");
		$('#soloBusinessMonthly').text("$" + monthlyPricing.soloBusinessPlan + ".95/month");
		$('#soloProfessionalMonthly').text("$" + monthlyPricing.soloProfessionalPlan + ".95/month");
		$('.starterPlanAvailable').text('$0.00');
	}
	var numberOfLocationAddOns = 0, numberOfStaffAddOns = 0;
	if(locationValue > 5){
		var locationAdditions = locationValue - 5;
		numberOfLocationAddOns = Math.ceil(locationAdditions/5);
	}
	if(staffValue > 5){
		var staffAdditions = staffValue - 5;
		numberOfStaffAddOns = Math.ceil(staffAdditions/5);
	}
	//Annual add on cost
	var locationAddOnCostBusinessAnnual = annualPricing.teamBusinessAddOns * numberOfLocationAddOns;
	var staffAddOnCostBusinessAnnual = annualPricing.teamBusinessAddOns * numberOfStaffAddOns;
	var locationAddOnCostProfessionalAnnual = annualPricing.teamProfessionalAddOns * numberOfLocationAddOns;
	var staffAddOnCostProfessionalAnnual = annualPricing.teamProfessionalAddOns * numberOfStaffAddOns;
	//Monthly add on cost
	var locationAddOnCostBusinessMonthly = monthlyPricing.teamBusinessAddOns * numberOfLocationAddOns;
	var staffAddOnCostBusinessMonthly = monthlyPricing.teamBusinessAddOns * numberOfStaffAddOns;
	var locationAddOnCostProfessionalMonthly = monthlyPricing.teamProfessionalAddOns * numberOfLocationAddOns;
	var staffAddOnCostProfessionalMonthly = monthlyPricing.teamProfessionalAddOns * numberOfStaffAddOns;
	//Total annual cost by month
	var teamBusinessAnnualPricingByMonth = (Number(annualPricing.teamBusinessPlan) + 0.45) + locationAddOnCostBusinessAnnual + staffAddOnCostBusinessAnnual;
	var teamProfessionalAnnualPricingByMonth = (Number(annualPricing.teamProfessionalPlan) + 0.95) + locationAddOnCostProfessionalAnnual + staffAddOnCostProfessionalAnnual;
	//Total annual cost by year
	var teamBusinessAnnualPricingByYear = teamBusinessAnnualPricingByMonth * 12, teamBusinessAnnualPricingByYear = Math.round(teamBusinessAnnualPricingByYear * 100) / 100;;
	var teamProfessionalAnnualPricingByYear = teamProfessionalAnnualPricingByMonth * 12, teamProfessionalAnnualPricingByYear = Math.round(teamProfessionalAnnualPricingByYear * 100) / 100;;;
	//Total monthly cost by month
	var teamBusinessMonthlyPricingByMonth = (Number(monthlyPricing.teamBusinessPlan) + 0.95) + locationAddOnCostBusinessMonthly + staffAddOnCostBusinessMonthly;
	var teamProfessionalMonthlyPricingByMonth = (Number(monthlyPricing.teamProfessionalPlan) + 0.95) + locationAddOnCostProfessionalMonthly + staffAddOnCostProfessionalMonthly;
	$('#teamBusinessAnnual').text("$" + teamBusinessAnnualPricingByMonth + "/month ($" + teamBusinessAnnualPricingByYear + " per year)");	
	$('#teamProfessionalAnnual').text("$" + teamProfessionalAnnualPricingByMonth + "/month ($" + teamProfessionalAnnualPricingByYear + " per year)");
	
	$('#teamBusinessMonthly').text("$" + teamBusinessMonthlyPricingByMonth + "/month");
	
	$('#teamProfessionalMonthly').text("$" + teamProfessionalMonthlyPricingByMonth + "/month");
	
	
}

var setDefaultPricingValues = function(){
	$('#locationCount').val(locationValue);
	$('#staffCount').val(staffValue);
	calculatePricing(locationValue, staffValue);
}

var changeStaffLocationVals = function(path){
	locationValue = $('#locationCount').val();
	staffValue = $('#staffCount').val();
	calculatePricing(locationValue, staffValue);
	
}

window.onload = function() {
  switchPricing(activeClass);
  setDefaultPricingValues();
  var year = new Date().getFullYear();
	$('#currentYear').text(year);
};