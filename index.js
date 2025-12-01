function formatDate(iso){
    try {
        var d = new Date(iso);
        if (isNaN(d)) {
            return iso;
        }
        
        return d.toLocaleString();

    } catch(e) {
        return iso;

    }
}

var badges = document.querySelectorAll('.nitro-badge');
badges.forEach(function(b) {
    var tooltip = b.querySelector('.tooltip');
    var start = b.getAttribute('data-nitro-start') || '';
    var label = start ? ('Nitro since: ' + formatDate(start)) : 'Nitro';
    if (tooltip) tooltip.textContent = label;

    var show = function(){ if (tooltip) tooltip.setAttribute('aria-hidden','false'); };
    var hide = function(){ if (tooltip) tooltip.setAttribute('aria-hidden','true'); };

    b.addEventListener('mouseenter', show);
    b.addEventListener('mouseleave', hide);
    b.addEventListener('focus', show);
    b.addEventListener('blur', hide);
});