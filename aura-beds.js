/* AuraBeds: the ONE place that decides what state a bed is in. Bed Management, the owner Dashboard
   Bed Map, the reception Bed Overview and the doctor bed view all call AuraBeds.state(), so a bed
   can never show one status in one place and another status somewhere else.

   Source of truth: the bed's own row in the "beds" table (its status) plus the active admission on it.
   Reception saves statuses in lower case ("reserved") and the owner portal in title case ("Reserved");
   both mean the same thing here.

   States and colours (the colours live in aura-theme.css as --bed-* and are shared by every view):
     occupied  a patient is admitted on it, or it is marked Occupied     (dark)
     critical  marked Critical                                           (dark, red edge)
     reserved  marked Reserved                                           (amber)
     cleaning  marked Cleaning                                           (dashed)
     free      anything else that is switched on                         (light green, green border)
     inactive  switched off by the owner                                 (faded)                       */
(function () {
  function norm(s) { return String(s == null ? '' : s).trim().toLowerCase(); }
  window.AuraBeds = {
    /* bed: a row from "beds"; adm: the active admission on that bed (or null) */
    state: function (bed, adm) {
      if (!bed) return 'free';
      if (bed.is_active === false) return 'inactive';
      var s = norm(bed.status);
      if (s === 'critical') return 'critical';
      if ((adm && (adm.patient_name || adm.patient_id || adm.id)) || s === 'occupied') return 'occupied';
      if (s === 'cleaning') return 'cleaning';
      if (s === 'reserved') return 'reserved';
      return 'free';
    },
    label: function (st) {
      return { occupied: 'Occupied', critical: 'Critical', reserved: 'Reserved', cleaning: 'Cleaning', free: 'Free', inactive: 'Switched off' }[st] || 'Free';
    },
    isTaken: function (st) { return st === 'occupied' || st === 'critical'; },
    /* active admissions -> { bed_id: admission } */
    admMap: function (rows) { var m = {}; (rows || []).forEach(function (a) { if (a && a.bed_id) m[a.bed_id] = a; }); return m; },
    /* count states for a list of beds */
    counts: function (beds, map) {
      var c = { total: 0, occupied: 0, critical: 0, reserved: 0, cleaning: 0, free: 0, inactive: 0 };
      (beds || []).forEach(function (b) { var st = AuraBeds.state(b, map && map[b.id]); c[st]++; if (st !== 'inactive') c.total++; });
      c.taken = c.occupied + c.critical;
      return c;
    }
  };
})();
