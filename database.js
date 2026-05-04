const Database = require('better-sqlite3');
const db = new Database('ace.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS parts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS part_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    part_id INTEGER,
    manufacturing TEXT,
    physics TEXT,
    chemistry TEXT,
    mathematics TEXT,
    FOREIGN KEY (part_id) REFERENCES parts(id)
  )
`);

const count = db.prepare('SELECT COUNT(*) as c FROM vehicles').get();
if (count.c === 0) {

  const insertVehicle = db.prepare(
    'INSERT INTO vehicles (name, category, description, image_url) VALUES (?, ?, ?, ?)'
  );

  const re = insertVehicle.run(
    'Royal Enfield Classic 350',
    'Motorcycle',
    'An iconic Indian motorcycle known for its classic design, thumping 349cc engine, and robust build. Loved by millions for its retro styling and reliable performance.',
    '/images/engine.jpg'
  );

  const insertPart = db.prepare(
    'INSERT INTO parts (vehicle_id, name, category, image_url) VALUES (?, ?, ?, ?)'
  );

  const insertDetail = db.prepare(
    'INSERT INTO part_details (part_id, manufacturing, physics, chemistry, mathematics) VALUES (?, ?, ?, ?, ?)'
  );

  // ===== ENGINE COMPONENTS =====

  const piston = insertPart.run(re.lastInsertRowid, 'Piston & Cylinder', 'Engine', '/images/piston.jpg');
  insertDetail.run(piston.lastInsertRowid,
    'The piston is manufactured using gravity die casting of aluminium-silicon alloy (Al-Si). Molten aluminium is poured into a precision steel mould and allowed to cool slowly. After casting, CNC machining gives exact dimensions for ring grooves, pin bore, and skirt profile. The cylinder bore is honed to a mirror finish of Ra 0.4 microns for perfect piston fit. Surface is then tin or iron coated for wear resistance.',
    'Thermodynamics: The piston converts heat energy from fuel combustion into mechanical work. During the power stroke, hot gases at 2000°C and 50 bar pressure push the piston downward. This follows the ideal gas law PV=nRT. The Classic 350 has a 349cc single cylinder with bore 72mm and stroke 90mm. The reciprocating motion of piston is converted to rotational motion via connecting rod and crankshaft.',
    'Aluminium-Silicon alloy (LM13 — 12% Si) is used for lightweight strength. Silicon reduces thermal expansion and improves wear resistance. The piston crown handles 300°C continuous temperature. Piston rings are made from grey cast iron — the graphite in cast iron provides natural lubrication. Ring grooves are hard anodised to 400 HV for wear resistance.',
    'Piston area A = π/4 × D² = π/4 × (0.072)² = 0.004072 m². At peak pressure 50 bar: Force = P×A = 50×10⁵ × 0.004072 = 20,360 N. Compression ratio CR = (Vs+Vc)/Vc = 8.5:1. Engine displacement = π/4 × D² × L = π/4 × 72² × 90 = 366,000 mm³ ≈ 349cc. Power = (BMEP × L × A × N) / (2 × 60) where BMEP = brake mean effective pressure.'
  );

  const sparkplug = insertPart.run(re.lastInsertRowid, 'Spark Plug', 'Engine', '/images/spark-plug.jpg');
  insertDetail.run(sparkplug.lastInsertRowid,
    'The spark plug centre electrode is made from nickel-yttrium alloy or iridium for premium variants. The ceramic insulator is made from aluminium oxide (Al₂O₃) fired at 1600°C in a kiln. The steel shell is cold forged and then zinc plated for corrosion resistance. The electrode gap is precision set to 0.7-0.8mm using feeler gauges. The Classic 350 uses NGK BP6ES or equivalent spark plug with 14mm thread.',
    'Electromagnetism: The ignition coil steps up 12V battery voltage to 20,000-40,000V using electromagnetic induction. When this high voltage is applied across the 0.7mm electrode gap, the electric field exceeds the dielectric breakdown strength of air (3×10⁶ V/m), creating a plasma spark at 60,000 K temperature. This spark ignites the compressed air-fuel mixture instantly, starting the combustion process.',
    'Centre electrode: Nickel-yttrium alloy (Ni-Y) — yttrium improves oxidation resistance at high temperatures up to 1000°C. Iridium (Ir) tip has melting point 2446°C — 6× harder than platinum, lasts 100,000 km. Ceramic insulator: Aluminium oxide (Al₂O₃) — electrical resistivity 10¹⁴ Ω.cm, excellent thermal conductor, withstands 1000°C.',
    'Ignition voltage required: V = E × d = 3×10⁶ V/m × 0.0007m = 2100V minimum. Spark energy: E = ½CV² = ½ × 10×10⁻¹² × (30000)² = 4.5 mJ. Spark duration: 1-2 milliseconds. Ignition timing: 32° BTDC at high RPM. At 5500 RPM, time for one cycle = 60/(5500/2) = 0.0218 seconds. Spark fires every 0.0218 seconds.'
  );

  const crankshaft = insertPart.run(re.lastInsertRowid, 'Crankshaft', 'Engine', '/images/crankshaft.jpg');
  insertDetail.run(crankshaft.lastInsertRowid,
    'The crankshaft is manufactured by drop forging of EN8 carbon steel. A 5kg steel billet is heated to 1200°C and placed between two precision dies in a 500-tonne forging press. The dies stamp the crankshaft shape in 3-4 blows. After forging, excess material (flash) is trimmed. The journals and pins are then ground on a CNC crankshaft grinder to tolerance of ±0.002mm. Journals are induction hardened to 55-60 HRC. Oil passages are drilled through for lubrication. Finally dynamic balancing is done to eliminate vibration.',
    'Mechanics: The crankshaft converts the reciprocating linear motion of the piston into rotational motion using the crank-slider mechanism. The crank throw (45mm for Classic 350) determines the stroke length (90mm = 2 × 45mm). The flywheel attached to the crankshaft stores rotational kinetic energy and maintains smooth rotation between power strokes. Angular momentum conservation keeps the engine running during non-power strokes.',
    'EN8 medium carbon steel (0.4% C, 0.7% Mn) — tensile strength 620 MPa after heat treatment. Carbon content provides hardness while manganese improves hardenability. Induction hardening creates a hard surface layer (55-60 HRC) while maintaining a tough core. Oil passages are critical — SAE 20W-50 engine oil at 3-4 bar pressure lubricates all journal bearings. Bearing shells are made from copper-lead alloy for excellent load capacity.',
    'Crank throw r = stroke/2 = 90/2 = 45mm = 0.045m. Engine torque T = F × r = 20,360 × 0.045 = 916 Nm (peak combustion). Useful torque at output = 28 Nm at 4000 RPM (rated). Angular velocity ω = 2πN/60 = 2π×4000/60 = 419 rad/s. Power P = T×ω = 28×419 = 11,732 W = 15.7 HP. Mechanical efficiency = Output power/Indicated power = 75-80%.'
  );

  const camshaft = insertPart.run(re.lastInsertRowid, 'Camshaft & Valves', 'Engine', '/images/camshaft.jpg');
  insertDetail.run(camshaft.lastInsertRowid,
    'The camshaft is manufactured by casting or forging of chilled cast iron or EN steel. Cam lobes are ground to precise profiles on a CNC cam grinding machine. The Classic 350 uses an overhead valve (OHV) design with pushrods — the camshaft is in the engine block and operates valves via pushrods and rocker arms. Valves are made from heat-resistant steel (21-4N for exhaust, EN52 for intake) by hot forging and precision grinding.',
    'Kinematics: The camshaft rotates at half the crankshaft speed (1:2 ratio via timing chain). Each cam lobe profile is precisely designed to control valve opening duration, lift, and timing. Intake valve opens 10° BTDC and closes 50° ABDC. Exhaust valve opens 55° BBDC and closes 5° ATDC. Valve overlap (both valves open simultaneously) improves cylinder scavenging and breathing efficiency at high RPM.',
    'Camshaft: Chilled cast iron — surface hardness 600 HV achieved by rapid cooling of cast iron which forms hard white iron (Fe₃C) on cam surface. Intake valve: EN52 martensitic steel — chromium and silicon provide oxidation resistance at 400°C. Exhaust valve: 21-4N austenitic steel — 21% chromium, 4% nickel — withstands 750°C exhaust temperatures. Valve spring: Chromium-vanadium steel wire.',
    'Cam ratio = Crankshaft RPM / Camshaft RPM = 2:1. At 5500 RPM engine speed, camshaft = 2750 RPM. Valve lift for Classic 350 = 8mm intake, 7.5mm exhaust. Timing chain pitch = 9.525mm (3/8 inch). Number of chain links = 92. Valve spring force = k × x = 25 N/mm × 8mm = 200N (at full lift). Rocker arm ratio = 1.5:1 amplifies cam lift.'
  );

  const carburetor = insertPart.run(re.lastInsertRowid, 'Carburetor', 'Engine', '/images/carburetor.jpg');
  insertDetail.run(carburetor.lastInsertRowid,
    'The carburetor body is manufactured by die casting of zinc alloy (Zamak) or aluminium alloy. The casting is then CNC machined for precise bore dimensions and fuel passages. The main jet, needle jet, and pilot jet are made from brass by screw machining to very tight tolerances. The float is made from brass or plastic. The Classic 350 uses a CV (Constant Velocity) type carburetor — UCO 26mm or Mikuni BS26 — with automatic slide operation for smooth fuelling.',
    'Fluid Mechanics: The carburetor works on Bernoulli principle. As air flows through the venturi (narrowed section), velocity increases and pressure drops below atmospheric. This pressure difference draws fuel from the float bowl through the main jet. The air-fuel mixture is atomised into fine droplets before entering the cylinder. At idle, the throttle plate is nearly closed and fuel is supplied through the pilot circuit.',
    'Carburetor body: Zamak (zinc-aluminium alloy) — good corrosion resistance, easy to cast complex shapes. Jets: Brass (Cu-Zn alloy) — easy to machine precise orifices, good corrosion resistance to fuel. Float: Brass or ABS plastic — buoyant in petrol, controls fuel level at 8mm below top of jet. Fuel: Petrol (C₈H₁₈) — octane rating 87-91 RON. Stoichiometric ratio: 14.7:1 air to fuel by mass.',
    'Venturi pressure drop: ΔP = ½ρv² = ½×1.2×(40)² = 960 Pa. Air-fuel ratio = 14.7:1 by mass. At 5500 RPM, airflow = 180 litres/minute. Main jet size = 110 (0.110mm orifice). Fuel flow = Cd × A × √(2ΔP/ρ) where Cd=0.6. Idle mixture screw: 2.5 turns out from seated = optimum idle mixture. Float level: 15.5mm from gasket face.'
  );

  // ===== CHASSIS COMPONENTS =====

  const frame = insertPart.run(re.lastInsertRowid, 'Chassis Frame', 'Chassis', '/images/frame.jpg');
  insertDetail.run(frame.lastInsertRowid,
    'The Classic 350 uses a single downtube frame made from ERW (Electric Resistance Welded) mild steel tubes of various diameters (25-40mm). Tubes are cut to length on a circular saw and bent using CNC hydraulic tube bending machines. All joints are MIG welded using ER70S-6 welding wire. After welding, the frame is stress-relieved in an oven at 600°C. It is then shot blasted, zinc phosphated, and powder coated in a continuous conveyor oven at 180°C for 20 minutes.',
    'Structural Mechanics: The frame is a space frame structure that must withstand multiple load cases: static load of rider+pillion+luggage (250kg), dynamic bump loads (3G = 7500N), braking loads, and cornering loads. The single downtube design is simpler and lighter. Torsional stiffness is critical for handling — measured in Nm/degree. The steering head angle and frame geometry determine the handling characteristics.',
    'Mild steel (IS 1079 — Fe360): tensile strength 360 MPa, yield strength 240 MPa, elongation 26%. Carbon content 0.12-0.20% gives good weldability and ductility. ERW tubing is made by forming cold rolled strip into a tube and welding the seam with electric resistance. Zinc phosphate coating (2-3 microns) provides corrosion protection and key for powder coat adhesion. Polyester powder coat (60-80 microns) provides UV and scratch resistance.',
    'Frame weight = 18kg (dry). Bending stress σ = M×y/I. For downtube under braking: M = F×L = 3000×0.6 = 1800 Nm. For 35mm tube with 2mm wall: I = π/64×(35⁴-31⁴) = 36,300 mm⁴. y = 17.5mm. σ = 1800×10³×17.5/36,300 = 867 MPa. Safety factor = 360/867 = 0.41 — so frame uses multiple tubes in parallel for adequate strength.'
  );

  const fueltank = insertPart.run(re.lastInsertRowid, 'Fuel Tank', 'Chassis', '/images/fuel-tank.jpg');
  insertDetail.run(fueltank.lastInsertRowid,
    'The fuel tank is manufactured from cold rolled mild steel sheet (0.8mm thickness) by deep drawing and pressing. The tank is made in two halves — upper and lower — pressed on a hydraulic press. The two halves are MIG welded together and the weld seam is ground smooth. The tank is then tested for leaks at 0.3 bar air pressure. After testing, it is cleaned, zinc phosphated, and painted. The cap assembly is made from chrome plated brass or zinc alloy.',
    'Fluid Statics: The fuel tank stores 13.5 litres of petrol above the engine. Fuel flows by gravity through the petcock (fuel tap) to the carburetor float bowl. The fuel level in the float bowl is maintained at a constant height by the float valve — this is critical for correct air-fuel ratio. A vent tube prevents vacuum formation as fuel is consumed. The petcock has Reserve position — main feed stops at 1.5 litres remaining.',
    'Tank material: Low carbon steel (DC01) — excellent deep drawing properties, 0.8mm thickness, weight 2.2kg. Zinc phosphate + enamel paint exterior. Tank interior is coated with fuel-resistant paint or Plastisol to prevent rust. Petcock: Brass body with rubber diaphragm. Fuel cap seal: NBR (Nitrile Butadiene Rubber) — resistant to petrol and ethanol blends. Petrol (C₈H₁₈) density = 0.72-0.75 kg/litre.',
    'Tank capacity = 13.5 litres. Fuel weight = 13.5 × 0.74 = 10 kg when full. Fuel consumption at 60 kmph = 35 km/litre. Range = 13.5 × 35 = 472 km (full tank). Reserve = 1.5 litres = 52 km range. Fuel flow to carburetor = engine power / (calorific value × efficiency) = 11,700 / (44,000,000 × 0.25) = 0.00106 kg/s = 1.43 litres/hour at full power.'
  );

  // ===== ELECTRICAL COMPONENTS =====

  const battery = insertPart.run(re.lastInsertRowid, 'Battery', 'Electrical', '/images/battery.jpg');
  insertDetail.run(battery.lastInsertRowid,
    'The Classic 350 uses a 12V, 12Ah sealed Maintenance Free (MF) lead-acid battery. Battery plates are made from lead-calcium alloy grids pasted with lead oxide (PbO). Positive plates use lead dioxide (PbO₂), negative plates use sponge lead (Pb). Plates are assembled with microporous polyethylene separators, inserted in polypropylene case, and filled with sulphuric acid electrolyte at specific gravity 1.28. The case is then heat sealed and tested.',
    'Electrochemistry & Electromagnetism: The battery is an electrochemical cell that converts chemical energy to electrical energy. Discharge reaction: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O + electrical energy. Each cell generates 2.1V EMF. Six cells in series = 12.6V fully charged. During charging (by alternator), reaction reverses. The internal resistance of 0.01-0.02Ω causes voltage drop under heavy load (starter motor).',
    'Electrolyte: H₂SO₄ solution at SG 1.265-1.280. During discharge, H₂SO₄ is consumed and water forms — SG drops to 1.10 when fully discharged. Positive plate: PbO₂ (lead dioxide) — brown colour, strong oxidising agent, standard electrode potential +1.685V. Negative plate: Pb (sponge lead) — grey, standard electrode potential -0.356V. Cell voltage = 1.685 + 0.356 = 2.041V. Polypropylene case: acid-resistant, impact-resistant at -40°C to +60°C.',
    'Capacity Q = 12 Ah. Energy stored E = V×Q = 12×12×3600 = 518,400 J = 518.4 kJ. Starter motor current = 100A for 2 seconds = 0.056 Ah. Battery internal resistance r = 0.015Ω. Voltage drop during starting: ΔV = I×r = 100×0.015 = 1.5V. Terminal voltage = 12.6 - 1.5 = 11.1V during cranking. Charging current = Q/10 = 12/10 = 1.2A (C/10 rate). Ohm\'s law: V = IR → R = V/I.'
  );

  const alternator = insertPart.run(re.lastInsertRowid, 'Alternator', 'Electrical', '/images/alternator.jpg');
  insertDetail.run(alternator.lastInsertRowid,
    'The Classic 350 uses a flywheel magneto type alternator (not a separate alternator). The rotor consists of permanent magnets embedded in the flywheel. The stator has 12 coils wound with 26 AWG copper wire on laminated silicon steel cores. The stator is bolted to the engine crankcase. As the flywheel rotates, the rotating magnets induce AC voltage in the stator coils. This AC is rectified to DC by a 3-phase bridge rectifier and regulated to 14.5V by an electronic voltage regulator (RR unit).',
    'Electromagnetic Induction: Based on Faraday\'s law — EMF = -N×dΦ/dt. As each magnet pole passes a stator coil, the magnetic flux changes rapidly, inducing voltage. The 6-pole rotor produces 3 complete cycles per revolution. At 3000 RPM: frequency = 3000/60 × 3 = 150 Hz AC. The permanent magnets are made from ferrite — they require no external power unlike field-wound alternators.',
    'Rotor magnets: Ferrite (BaFe₁₂O₁₉) permanent magnets — remanence 0.38T, coercivity 240 kA/m. Stator core: Silicon steel laminations (3% Si) — reduces eddy current losses by 50% compared to solid iron. Copper wire: 99.95% pure copper, conductivity 5.8×10⁷ S/m. Rectifier diodes: Silicon diodes, forward voltage 0.7V, reverse breakdown >50V. Voltage regulator: SCR (Silicon Controlled Rectifier) based crowbar circuit.',
    'Output power P = 12V × 150W = 1800W rated (but Classic 350 is ~150W). Stator resistance per phase = 0.5Ω. Open circuit voltage at 3000 RPM = 18V AC. After rectification: VDC = 0.955 × VAC = 0.955 × 18 = 17.2V. Regulator clips to 14.5V. Current output = P/V = 150/14.5 = 10.3A. Charging current to battery = 10.3 - 6 (loads) = 4.3A. EMF = 4.44 × f × N × Φ (transformer equation).'
  );

  const wiring = insertPart.run(re.lastInsertRowid, 'Wiring Harness', 'Electrical', '/images/wiring.jpg');
  insertDetail.run(wiring.lastInsertRowid,
    'The wiring harness is manufactured by assembling individual insulated copper wires on a formboard layout. Each wire is cut to precise length, stripped at ends, and crimped with terminals using automated crimping machines. Wire gauges range from 0.5mm² (signals) to 4mm² (main power). Wires are bundled together with PVC tape and nylon cable ties. Connectors are injection moulded from nylon 66 with copper or brass terminals. The complete harness is tested on a continuity and insulation tester.',
    'Electrical Circuit Theory: The wiring harness is the nervous system of the motorcycle — it connects all electrical components in a complex network of series and parallel circuits. The main fuse (15A) protects the entire system. Individual circuits (ignition, lighting, horn) have separate fuses. Earth (ground) return is through the chassis frame. Switch contacts control current flow to each load. Connector reliability is critical — oxidised contacts cause voltage drop.',
    'Wire insulation: PVC (Polyvinyl Chloride) — temperature rating 70°C, excellent electrical insulation (resistivity 10¹⁵ Ω.cm), flexible. High-temperature areas use XLPE (cross-linked polyethylene) — rated 90°C. Conductor: Annealed copper (99.9% Cu) — conductivity 5.8×10⁷ S/m. Connector housing: Nylon 66 — melting point 265°C, good chemical resistance. Terminal plating: Tin plating prevents oxidation, ensures reliable contact.',
    'Wire resistance R = ρL/A. For 1m of 1mm² copper wire: R = (1.72×10⁻⁸ × 1) / (1×10⁻⁶) = 0.0172Ω. Voltage drop at 10A: ΔV = IR = 10 × 0.0172 = 0.172V per metre. Total harness length ~15m. Main fuse 15A: I²Rt = (15)²×0.001×t = energy before blow. Headlight circuit: 12V × 35W halogen = 2.92A. Ohm\'s law: R = V/I = 12/2.92 = 4.1Ω (headlight filament resistance).'
  );

  const ecu = insertPart.run(re.lastInsertRowid, 'ECU (Engine Control Unit)', 'Electrical', '/images/ecu.jpg');
  insertDetail.run(ecu.lastInsertRowid,
    'The ECU (Engine Control Unit) is the brain of the fuel-injected Classic 350 (J series). It is manufactured on a PCB (Printed Circuit Board) with SMD (Surface Mount Device) components soldered by automated pick-and-place and reflow soldering machines. The ECU is housed in a sealed aluminium enclosure for vibration and moisture protection. It processes inputs from multiple sensors and controls fuel injection timing, ignition timing, and idle speed.',
    'Electronics & Control Systems: The ECU uses a microprocessor running at 16-32 MHz that samples sensor data thousands of times per second. It uses lookup tables (maps) stored in Flash memory to determine optimum fuel injection duration and ignition timing for every operating condition. The ECU implements closed-loop control using the oxygen sensor feedback to maintain stoichiometric (14.7:1) air-fuel ratio for minimum emissions.',
    'PCB: FR4 fibreglass substrate with copper tracks (35 microns thick). Microprocessor: 16-bit or 32-bit automotive-grade IC. Flash memory: 512KB-2MB for fuel maps and programme. RAM: 32KB for real-time calculations. Sensors input: TPS (throttle position), MAP (manifold absolute pressure), CKP (crankshaft position), CTS (coolant temperature), O₂ sensor. Output drivers: MOSFET transistors switch injectors and coil. Supply voltage: 12V, current 0.5-2A.',
    'Injection duration calculation: PW = (MAF × AFR_target × K) / (Injector_flow_rate). At idle: MAF=2g/s, AFR=14.7, K=constant. Injection at idle ≈ 2.5ms. Ignition timing: Base timing 32° BTDC ± corrections. Injection frequency = RPM/2 = 1375 pulses/min at idle. Processing cycle: 1ms. ADC resolution: 10-bit = 1024 steps = 0.0049V per step on 5V reference. CAN bus speed: 500 kbps.'
  );

  // ===== SUSPENSION =====

  const suspension = insertPart.run(re.lastInsertRowid, 'Suspension System', 'Suspension', '/images/suspension.jpg');
  insertDetail.run(suspension.lastInsertRowid,
    'Front: 35mm telescopic hydraulic forks with 130mm travel. Inner tubes (stanchions) are made from carbon steel, hard chrome plated to 20 microns for smooth sliding. Outer tubes (sliders) are cast aluminium alloy. Inside each fork: a coil spring and hydraulic damper with oil. Rear: Twin gas-charged shock absorbers with 5-step adjustable preload. Shock body is steel, piston rod is chrome steel, spring is 65Mn steel wire wound on a CNC coiling machine.',
    'Newton\'s Laws & Hooke\'s Law: Front fork spring absorbs bump energy — F = k×x (Hooke\'s Law). Spring rate k = 4.5 N/mm for front. When wheel hits a 50mm bump at 60 kmph, kinetic energy = ½mv² = ½×95×0.56² = 14.9 J. This energy compresses the spring by x = √(2E/k) = √(2×14.9/4500) = 0.081m = 81mm. Hydraulic damper converts remaining kinetic energy to heat — damping force = c×v (viscous damping equation).',
    'Fork inner tube: SAE 4130 chromoly steel — tensile strength 670 MPa, hardness 200 HV. Chrome plating: Hexavalent chromium (Cr) — hardness 1000 HV, low friction coefficient 0.16. Fork oil: SAE 10W mineral oil — kinematic viscosity 10 cSt at 100°C. Outer tube: Aluminium alloy A380 die cast. Fork seals: NBR (Nitrile rubber) — oil resistant. Rear spring: 65Mn steel — tensile strength 1200 MPa after quench & temper.',
    'Front spring rate k_f = 4.5 N/mm. Natural frequency f_n = (1/2π)√(k/m) = (1/2π)√(4500/95) = 1.09 Hz. Optimal ride frequency 1-1.5 Hz. Damping ratio ζ = c/(2√(km)) — for critical damping c = 2√(4500×95) = 1306 Ns/m. Fork oil quantity: 135ml per leg. Rear spring rate: 6.5 N/mm. Total suspension travel: Front 130mm, Rear 80mm. Static sag: 30mm front, 25mm rear with rider.'
  );

  // ===== BRAKING SYSTEM =====

  const frontbrake = insertPart.run(re.lastInsertRowid, 'Front Disc Brake', 'Braking', '/images/front-brake.jpg');
  insertDetail.run(frontbrake.lastInsertRowid,
    'The front disc brake uses a 300mm diameter, 5mm thick ventilated disc made from grey cast iron (GCI 200). The disc is cast in a sand mould, then CNC machined on both faces to flatness tolerance of 0.05mm. Ventilation holes are drilled for heat dissipation. The 2-piston floating caliper is cast from aluminium alloy and machined to precise bore dimensions. Brake pads are made from semi-metallic friction compound moulded under heat and pressure, then bonded and riveted to steel backplates.',
    'Friction & Energy Conversion: Braking converts kinetic energy to heat. At 80 kmph (22.2 m/s), KE = ½mv² = ½×195×22.2² = 48,100 J. This energy must be dissipated as heat in the disc and pads. Friction force F = μ×N where μ=0.38 (semi-metallic pads on cast iron) and N is the caliper clamping force. The disc must absorb 48,100 J in a typical stop — disc temperature rises by ΔT = Q/(m×Cp) = 48100/(1.8×500) = 53°C per stop.',
    'Disc material: Grey cast iron GCI 200 — 2.5-4% carbon as graphite flakes. Graphite provides solid lubrication and excellent thermal conductivity 50 W/mK. Tensile strength 200 MPa, hardness 180-220 HB. Brake pad friction compound: Steel fibres (30%), copper fibres (10%), graphite (15%), friction modifiers, phenolic resin binder. Friction coefficient 0.35-0.45. Pad withstands 400°C continuous, 800°C peak. Caliper: Aluminium alloy A356 — lightweight, good corrosion resistance.',
    'Braking force at disc: F = μ × N = 0.38 × 3000N caliper force = 1140N. Braking torque: T = F × r_disc = 1140 × 0.15 = 171 Nm. Deceleration: a = F/m = 1140/195 = 5.85 m/s². Stopping distance from 80 kmph: s = v²/2a = 22.2²/(2×5.85) = 42.1m. Brake fluid pressure: P = F_pedal × MA / A_master = 200×6 / (1.5×10⁻⁴) = 8 MPa. Pascal\'s law transmits this pressure to caliper pistons.'
  );

  // ===== STEERING ASSEMBLY =====

  const steering = insertPart.run(re.lastInsertRowid, 'Steering Assembly', 'Steering', '/images/steering.jpg');
  insertDetail.run(steering.lastInsertRowid,
    'The Classic 350 uses a classic wide handlebar (800mm width) made from seamless mild steel tube (22mm diameter, 2mm wall) bent on a CNC tube bender. The handlebar is chrome plated (decorative) or powder coated. The steering head contains two tapered roller bearings that allow smooth steering. The front fork is clamped in the upper and lower yokes (triple clamps) made from forged aluminium alloy. The switch housings are injection moulded from glass-filled nylon.',
    'Kinematics & Dynamics: Motorcycle steering works on countersteering principle — at speeds above 20 kmph, pushing the right handlebar initiates a right turn. The geometry is defined by rake angle (27°), trail (92mm), and offset. Trail = (wheel radius × sin(rake)) - offset = (310 × sin27°) - 30 = 141-30 = 111mm. Larger trail means more stability but heavier steering. The gyroscopic effect of rotating wheels resists changes in direction — providing straight-line stability.',
    'Handlebar: Mild steel (Fe 360) — tensile strength 360 MPa. Chrome plating: Cr layer 0.3 microns over 5 microns nickel — hardness 900 HV, bright decorative finish. Bearings: Tapered roller bearings — steel races, steel rollers, grease-lubricated. Steel: 52100 bearing steel — 1% carbon, 1.5% chromium — hardness 60-64 HRC. Switch housing: PA66-GF30 (30% glass-filled nylon) — improved rigidity, dimensional stability. Grip rubber: EPDM — weather resistant.',
    'Rake angle α = 27°. Trail T = (R×sinα)/1 - f = (310×sin27°)/1 - 30 = 141-30 = 111mm. Wheelbase L = 1390mm. Turning radius at 30° steering lock: r = L/tan(30°) = 1390/0.577 = 2409mm = 2.4m. Handlebar leverage: Torque = F × (handlebar width/2) = 50N × 0.4m = 20 Nm. Gyroscopic couple = I×ω×Ω where I=wheel inertia, ω=wheel angular velocity, Ω=rate of turn.'
  );

  // ===== TRANSMISSION =====

  const clutch = insertPart.run(re.lastInsertRowid, 'Clutch Assembly', 'Transmission', '/images/clutch.jpg');
  insertDetail.run(clutch.lastInsertRowid,
    'The Classic 350 uses a wet multi-plate clutch with 6 friction plates alternating with 6 plain steel plates. Friction plates are stamped from steel sheet and coated with cork composite or paper-based friction material bonded under 200°C heat and 50 bar pressure. Steel plates are stamped from 65Mn spring steel and hardened. The clutch basket is forged aluminium with hardened steel inserts at friction plate tabs. Six coil springs (chrome vanadium steel) provide the clamping force. All components are bathed in engine oil.',
    'Friction & Power Transmission: The clutch transmits torque by friction between alternating friction and steel plates clamped by springs. Torque capacity T = n×μ×F×r_mean where n=number of friction surfaces=12, μ=friction coefficient=0.12 (in oil), F=spring force=2500N, r_mean=mean plate radius=55mm. T = 12×0.12×2500×0.055 = 198 Nm — far exceeding engine torque of 28 Nm, giving safety factor of 7. When clutch lever is pulled, a pushrod disengages the pressure plate.',
    'Friction plates: Steel core with organic friction material — cellulose fibres, graphite, rubber, phenolic resin. Friction coefficient μ=0.12 in oil (vs 0.35 dry). Steel plates: 65Mn spring steel, hardened to 40-45 HRC. Engine oil (SAE 20W-50) acts as coolant and lubricant — prevents plate welding under high slip. Clutch springs: Chrome vanadium (Cr-V) steel — high fatigue strength, maintains load after millions of cycles. Basket: Aluminium alloy with steel inserts.',
    'Torque capacity T = n×μ×F×r_m = 12×0.12×2500×0.055 = 198 Nm. Safety factor = 198/28 = 7.07. Clutch slip during engagement: Power lost as heat P = T×Δω = 28×(ω_engine-ω_output). At takeoff from rest: Δω = 2π×1500/60 = 157 rad/s. Heat generated = 28×157 = 4396W during slip. Plate temperature rise: ΔT = P×t/(m×Cp) = 4396×2/(0.3×500) = 58°C per start. Clutch spring deflection: x = F/k = 2500/300 = 8.3mm.'
  );

  const gearbox = insertPart.run(re.lastInsertRowid, 'Gearbox', 'Transmission', '/images/gearbox.jpg');
  insertDetail.run(gearbox.lastInsertRowid,
    'The Classic 350 has a 5-speed constant mesh gearbox integrated with the engine. All gears are always in mesh — the operator selects gears by sliding dog clutches (selector forks). Gears are manufactured from 20MnCr5 alloy steel by gear hobbing — a rotating multi-tooth hob cutter generates the involute tooth profile. After hobbing, gears are carburised (900°C for 4-6 hours in carbon-rich atmosphere) to add carbon to surface (0.8%) while maintaining tough core (0.2%). Then hardened to 58-62 HRC and ground to final tooth profile accuracy of DIN class 6.',
    'Gear Mechanics: The gearbox multiplies torque and reduces speed according to the gear ratio. In 1st gear (ratio 2.72), engine torque of 28 Nm is multiplied to 28×2.72 = 76.2 Nm at gearbox output. Combined with primary drive ratio (2.905) and final drive ratio (2.684), total first gear ratio = 2.905×2.72×2.684 = 21.2:1. This is why motorcycles can start from rest — the engine torque is multiplied enormously at the rear wheel.',
    'Gear material: 20MnCr5 alloy steel — chromium (1%) and manganese (1.25%) improve hardenability. Carburising creates a hard case (0.8%C, 58-62 HRC) on a tough core (0.2%C, 30-35 HRC). Gear oil: SAE 20W-50 engine oil (same as engine — shared sump). EP (Extreme Pressure) additives (ZDDP, sulphur compounds) form protective film on gear teeth under high contact stress. Gear tooth contact stress: 1200-1500 MPa (Hertzian contact stress).',
    'Gear ratios: 1st=2.72, 2nd=1.84, 3rd=1.32, 4th=1.04, 5th=0.85. Primary drive ratio=2.905, Final drive=2.684. Speed in 1st at 3000 RPM: wheel RPM = 3000/(2.905×2.72×2.684) = 141 RPM. Speed = 2π×0.305×141/60 = 4.5 m/s = 16.2 kmph. Max speed in 5th at 5500 RPM: wheel RPM = 5500/(2.905×0.85×2.684) = 831 RPM. Speed = 2π×0.305×831/60 = 26.6 m/s = 95.7 kmph.'
  );

  const chain = insertPart.run(re.lastInsertRowid, 'Drive Chain & Sprocket', 'Transmission', '/images/chain.jpg');
  insertDetail.run(chain.lastInsertRowid,
    'The drive chain is a 520 series roller chain (pitch 15.875mm, roller width 6.35mm). Chain links are made from carbon steel by stamping. Inner plates, outer plates, rollers, bushes, and pins are assembled on automated chain assembly machines. The chain is then heat treated, shot peened for fatigue strength, and pre-stretched. The rear sprocket (42T) is made from mild steel by laser cutting or stamping. Front sprocket (14T) is machined from steel. Both are induction hardened on tooth flanks.',
    'Chain Drive Mechanics: The chain drive transmits power with near 100% efficiency when well lubricated. The chain wraps around the sprockets, converting rotational motion and transmitting torque. Chain tension has two components — tight side tension (T₁) and slack side tension (T₂). The ratio T₁/T₂ = e^(μθ) where μ=friction coefficient and θ=wrap angle. Centrifugal force in chain at high speed: Fc = mv²/r — this reduces effective tension and can cause vibration.',
    'Chain: Low carbon steel (0.15-0.25% C) — good toughness. Pins and bushes: Case hardened medium carbon steel 50-55 HRC surface. Rollers: Low carbon steel, surface hardened. O-ring chain: Nitrile rubber O-rings between inner and outer plates seal grease inside — extends service life to 25,000 km. Chain lubricant: SAE 80W-90 gear oil or chain spray — reduces friction coefficient μ from 0.3 to 0.05. Sprocket: Mild steel (S45C) with induction hardened tooth flanks 45-50 HRC.',
    'Chain ratio = Rear sprocket / Front sprocket = 42/14 = 3.0:1. At gearbox output of 831 RPM (5th gear, max speed): Rear wheel RPM = 831/3.0 = 277 RPM. Speed = 2πr×N = 2π×0.305×277/60 = 8.82 m/s. Chain speed = 14×15.875×10⁻³×(831×3/60) = 8.82 m/s. Chain tension in 1st gear: T₁ = T_engine×GR / r_sprocket = 28×21.2/0.108 = 5493N. Chain ultimate strength (520 chain) = 24,000N. Safety factor = 24000/5493 = 4.4.'
  );

  // ===== INSTRUMENTATION =====

  const instruments = insertPart.run(re.lastInsertRowid, 'Instrument Cluster', 'Instrumentation', '/images/instrument.jpg');
  insertDetail.run(instruments.lastInsertRowid,
    'The Classic 350 instrument cluster houses a speedometer, tachometer, fuel gauge, and warning lights. The housing is injection moulded from ABS plastic. The speedometer uses a cable drive from the front wheel hub — a flexible cable rotates a magnet inside the speedometer, inducing eddy currents in an aluminium drum that deflects the needle proportional to speed. The tachometer uses electronic pulse counting from the ignition system. The fuel gauge uses a float-type resistive sender in the tank connected to a d\'Arsonval meter movement.',
    'Electromagnetism & Mechanics: The cable-driven speedometer uses electromagnetic induction. A rotating magnet creates a rotating magnetic field that induces eddy currents in the aluminium cup. The resulting electromagnetic torque deflects the cup against a spiral return spring — the deflection is proportional to rotation speed (Faraday\'s law). The warning lights use LED technology — forward biased semiconductor junction emits photons when electrons recombine with holes (electroluminescence). LEDs are 10× more efficient than incandescent bulbs.',
    'Speedometer magnet: Ferrite permanent magnet — sufficient field strength for reliable eddy current generation. Aluminium cup: Good electrical conductor (σ = 3.5×10⁷ S/m) for strong eddy currents. Return spring: Phosphor bronze — excellent spring properties, corrosion resistant. Fuel sender: Wire-wound potentiometer on NiCr resistance wire. Dial face: Reverse printed polycarbonate (PC) sheet. LED indicator: GaAsP (Gallium Arsenide Phosphide) — emits orange/red light. Housing: ABS plastic — good impact resistance, paintable.',
    'Cable rotation to speed conversion: Wheel circumference = 2π×0.305 = 1.916m. At 60 kmph = 16.67 m/s: wheel RPM = 16.67/1.916×60 = 522 RPM. Cable RPM = 522. Eddy current torque T ∝ ω × B² × σ × volume. Fuel gauge resistance: Full = 10Ω (float up), Empty = 180Ω (float down). Gauge current: I = 12/(10+190) = 0.06A full, 12/(180+190) = 0.032A empty. Meter deflection proportional to current. Tachometer: counts 2 pulses/revolution (2-stroke ignition).'
  );

  // ===== INTERIOR / SEATING =====

  const seat = insertPart.run(re.lastInsertRowid, 'Rider Seat', 'Interior', '/images/seat.jpg');
  insertDetail.run(seat.lastInsertRowid,
    'The Classic 350 features a dual-tone bench seat with a steel base pan stamped from 1.2mm mild steel sheet. The base pan is powder coated for corrosion resistance. High-density polyurethane (PU) foam is moulded to shape in a closed mould at 40°C — the two-component PU system (polyol + isocyanate) reacts and expands to fill the mould cavity. The foam density is 35-40 kg/m³. The seat cover is made from PVC-coated fabric or genuine leather, sewn with UV-resistant nylon thread and stapled to the base pan.',
    'Ergonomics & Material Science: The seat foam acts as a spring-damper system for the rider. When a 75kg rider sits, the foam compresses by 20-30mm. The foam\'s spring rate determines riding comfort. The PU foam has a non-linear stress-strain curve — initially soft (low spring rate) for comfort, becoming progressively stiffer to prevent bottoming out. The seat height of 805mm affects ergonomics significantly — determines rider reach to footpegs and handlebars.',
    'Foam: Polyurethane (PU) — formed by reaction of polyol (-OH groups) with MDI isocyanate (-NCO groups): HO-R-OH + OCN-R\'-NCO → urethane bonds + CO₂ (causes foaming). Density 35-40 kg/m³, ILD (Indentation Load Deflection) 25-35 lbs for medium firmness. Cover: PVC-coated polyester fabric — PVC coating provides waterproofing and abrasion resistance. Thread: Polyester (Dacron) — UV resistant, high tensile strength 6-8 GPa. Base pan: Mild steel (DC01) 1.2mm.',
    'Seat area = 350mm × 280mm = 98,000 mm² = 0.098 m². Rider weight 75kg, seated contact force = 750N. Average pressure = F/A = 750/0.098 = 7653 Pa = 7.65 kPa. Comfort limit: <10 kPa sustained pressure (medical guideline). Foam spring rate: k = 8 N/mm. Deflection under 750N: x = F/k = 750/8 = 93.75mm — too much, so real foam is non-linear, stiffer at higher compression. Seat height 805mm — shorter riders (<165cm) may find it challenging.'
  );

  console.log('Royal Enfield Classic 350 — Complete data inserted!');
}

module.exports = db;