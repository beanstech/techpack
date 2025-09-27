export interface MaterialTypeItem {
  key: string; // slug/id
  name: string; // display name
  gsmRange: string; // e.g., "160-180 GSM"
  attributes: string[]; // e.g., ["Combed", "Ring-Spun"]
  image?: string; // optional; selection UI does not display images now
}

export type MaterialTypeCatalog = Record<string, MaterialTypeItem[]>; // keyed by material label from materials.ts

const materialTypes: MaterialTypeCatalog = {
  '100% Cotton': [
    {
      key: 'cotton_single_jersey',
      name: 'Single Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['Combed', 'Ring-Spun'],
    },
    {
      key: 'cotton_pique',
      name: 'Pique',
      gsmRange: '200-230 GSM',
      attributes: ['Combed', 'Soft Finish'],
    },
    {
      key: 'cotton_french_terry',
      name: 'French Terry',
      gsmRange: '260-300 GSM',
      attributes: ['Loopback', 'Brushed Back (optional)'],
    },
    {
      key: 'cotton_rib_1x1',
      name: 'Rib 1x1',
      gsmRange: '220-260 GSM',
      attributes: ['Stretch', 'Collar/Cuff'],
    },
    {
      key: 'cotton_rib_2x2',
      name: 'Rib 2x2',
      gsmRange: '240-280 GSM',
      attributes: ['Stretch', 'Collar/Cuff'],
    },
    {
      key: 'cotton_interlock',
      name: 'Interlock',
      gsmRange: '180-220 GSM',
      attributes: ['Stable', 'Opaque'],
    },
    {
      key: 'cotton_slub_jersey',
      name: 'Slub Jersey',
      gsmRange: '150-170 GSM',
      attributes: ['Textured', 'Casual'],
    },
  ],
  'Cotton Blend': [
    {
      key: 'cotton_poly_jersey',
      name: 'Cotton-Poly Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['Combed', 'Ring-Spun', 'Polyester Blend'],
    },
    {
      key: 'cotton_poly_fleece',
      name: 'Cotton-Poly Fleece',
      gsmRange: '280-320 GSM',
      attributes: ['Soft Handfeel', 'Warmth'],
    },
    {
      key: 'cotton_spandex_jersey',
      name: 'Cotton Spandex Jersey',
      gsmRange: '170-200 GSM',
      attributes: ['Stretch', 'Recovery'],
    },
    {
      key: 'poly_cotton_pique',
      name: 'Poly-Cotton Pique',
      gsmRange: '200-230 GSM',
      attributes: ['Durable', 'Breathable'],
    },
  ],
  'Organic Cotton': [
    {
      key: 'organic_single_jersey',
      name: 'Organic Single Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['GOTS', 'Combed', 'Ring-Spun'],
    },
    {
      key: 'organic_french_terry',
      name: 'Organic French Terry',
      gsmRange: '260-300 GSM',
      attributes: ['GOTS', 'Loopback'],
    },
  ],
  Bamboo: [
    {
      key: 'bamboo_jersey',
      name: 'Bamboo Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['Antibacterial', 'Soft Touch'],
    },
    {
      key: 'bamboo_cotton_jersey',
      name: 'Bamboo-Cotton Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['Soft', 'Breathable'],
    },
  ],
  Modal: [
    {
      key: 'modal_jersey',
      name: 'Modal Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['Smooth Drape', 'Soft Touch'],
    },
    {
      key: 'modal_cotton_blend',
      name: 'Modal-Cotton Blend',
      gsmRange: '160-190 GSM',
      attributes: ['Soft', 'Drape'],
    },
  ],
  Polyester: [
    {
      key: 'poly_interlock',
      name: 'Poly Interlock',
      gsmRange: '140-160 GSM',
      attributes: ['Moisture-Wicking', 'Quick-Dry'],
    },
    {
      key: 'poly_mesh',
      name: 'Poly Mesh',
      gsmRange: '120-160 GSM',
      attributes: ['Breathable', 'Sports'],
    },
    {
      key: 'poly_fleece',
      name: 'Poly Fleece',
      gsmRange: '260-320 GSM',
      attributes: ['Warmth', 'Brushed'],
    },
  ],
  'Cotton-Polyester Blend': [
    {
      key: 'cvc_jersey',
      name: 'CVC Jersey',
      gsmRange: '160-180 GSM',
      attributes: ['CVC', 'Low Shrinkage'],
    },
    {
      key: 'tc_twill',
      name: 'TC Twill',
      gsmRange: '200-260 GSM',
      attributes: ['Woven', 'Durable'],
    },
  ],
  Fleece: [
    {
      key: 'fleece_brushed',
      name: 'Brushed Fleece',
      gsmRange: '280-320 GSM',
      attributes: ['Warmth', 'Soft Back'],
    },
    {
      key: 'sherpa_fleece',
      name: 'Sherpa Fleece',
      gsmRange: '300-380 GSM',
      attributes: ['High Pile', 'Warm'],
    },
  ],
  'French Terry': [
    {
      key: 'french_terry_loopback',
      name: 'Loopback French Terry',
      gsmRange: '260-300 GSM',
      attributes: ['Loopback', 'Breathable'],
    },
    {
      key: 'french_terry_brushed',
      name: 'Brushed French Terry',
      gsmRange: '280-320 GSM',
      attributes: ['Soft Back', 'Warmth'],
    },
  ],
  'Cotton Poplin': [
    {
      key: 'poplin_plain',
      name: 'Plain Poplin',
      gsmRange: '110-140 GSM',
      attributes: ['Woven', 'Tight Weave', 'Smooth'],
    },
    {
      key: 'poplin_stretch',
      name: 'Stretch Poplin',
      gsmRange: '130-160 GSM',
      attributes: ['Added Elastane', 'Comfort Stretch'],
    },
  ],
  'Cotton Twill': [
    {
      key: 'twill_plain',
      name: 'Classic Twill',
      gsmRange: '200-260 GSM',
      attributes: ['Woven', 'Diagonal Ribs', 'Durable'],
    },
    {
      key: 'twill_stretch',
      name: 'Stretch Twill',
      gsmRange: '220-270 GSM',
      attributes: ['Elastane', 'Comfort Stretch'],
    },
  ],
  Denim: [
    {
      key: 'denim_rigid',
      name: 'Rigid Denim',
      gsmRange: '300-380 GSM',
      attributes: ['Woven', 'Durable', 'Classic'],
    },
    {
      key: 'denim_stretch',
      name: 'Stretch Denim',
      gsmRange: '250-340 GSM',
      attributes: ['Elastane', 'Comfort Stretch'],
    },
  ],
  'Stretch Denim': [
    {
      key: 'stretch_denim_2',
      name: '2% Stretch Denim',
      gsmRange: '260-340 GSM',
      attributes: ['2% Elastane', 'Comfort'],
    },
    {
      key: 'stretch_denim_power',
      name: 'Power Stretch Denim',
      gsmRange: '260-320 GSM',
      attributes: ['High Stretch', 'Recovery'],
    },
  ],
  'Organic Cotton Denim': [
    {
      key: 'organic_denim_rigid',
      name: 'Organic Rigid Denim',
      gsmRange: '300-380 GSM',
      attributes: ['Organic', 'Woven', 'Durable'],
    },
  ],
  'Recycled Denim': [
    {
      key: 'recycled_denim',
      name: 'Recycled Denim',
      gsmRange: '280-360 GSM',
      attributes: ['Recycled Content', 'Sustainable'],
    },
  ],
  'Cotton Canvas': [
    {
      key: 'canvas_plain',
      name: 'Plain Canvas',
      gsmRange: '240-320 GSM',
      attributes: ['Woven', 'Sturdy', 'Textured'],
    },
    {
      key: 'canvas_brushed',
      name: 'Brushed Canvas',
      gsmRange: '260-340 GSM',
      attributes: ['Soft Touch', 'Durable'],
    },
  ],
  'Waterproof Material': [
    {
      key: 'pu_coated',
      name: 'PU Coated',
      gsmRange: '140-220 GSM',
      attributes: ['Waterproof', 'Coated'],
    },
    {
      key: 'nylon_ripstop',
      name: 'Nylon Ripstop',
      gsmRange: '70-120 GSM',
      attributes: ['Ripstop Grid', 'Water-Resistant'],
    },
    {
      key: 'softshell',
      name: 'Softshell',
      gsmRange: '220-320 GSM',
      attributes: ['Bonded', 'Water-Resistant', 'Windproof'],
    },
  ],
  'Wool Blend': [
    {
      key: 'wool_poly',
      name: 'Wool-Poly Blend',
      gsmRange: '220-320 GSM',
      attributes: ['Warmth', 'Durable'],
    },
    {
      key: 'wool_stretch',
      name: 'Stretch Wool Blend',
      gsmRange: '240-320 GSM',
      attributes: ['Elastane', 'Comfort'],
    },
  ],
  Silk: [
    {
      key: 'silk_charmeuse',
      name: 'Silk Charmeuse',
      gsmRange: '80-120 GSM',
      attributes: ['Lustrous', 'Smooth', 'Drape'],
    },
    {
      key: 'silk_habotai',
      name: 'Silk Habotai',
      gsmRange: '60-90 GSM',
      attributes: ['Lightweight', 'Smooth'],
    },
  ],
  Chiffon: [
    {
      key: 'poly_chiffon',
      name: 'Poly Chiffon',
      gsmRange: '50-70 GSM',
      attributes: ['Sheer', 'Drapey', 'Lightweight'],
    },
    {
      key: 'silk_chiffon',
      name: 'Silk Chiffon',
      gsmRange: '40-60 GSM',
      attributes: ['Sheer', 'Airy'],
    },
  ],
  'Performance Fabric': [
    {
      key: 'poly_spandex',
      name: 'Poly-Spandex Jersey',
      gsmRange: '160-200 GSM',
      attributes: ['Stretch', 'Quick-Dry', 'Wicking'],
    },
    {
      key: 'nylon_spandex',
      name: 'Nylon-Spandex Interlock',
      gsmRange: '180-220 GSM',
      attributes: ['Compression', 'Wicking'],
    },
  ],
  'Moisture-Wicking Fabric': [
    {
      key: 'mw_interlock',
      name: 'Wicking Interlock',
      gsmRange: '140-170 GSM',
      attributes: ['Quick-Dry', 'Breathable'],
    },
    {
      key: 'mw_mesh',
      name: 'Wicking Mesh',
      gsmRange: '110-150 GSM',
      attributes: ['Open Structure', 'Breathable'],
    },
  ],
  'Performance Cotton': [
    {
      key: 'perf_cotton_finish',
      name: 'Performance Cotton Finish',
      gsmRange: '160-200 GSM',
      attributes: ['Moisture Management', 'Quick-Dry'],
    },
  ],
  'Cotton Blend Pique': [
    {
      key: 'blend_pique',
      name: 'Cotton Blend Pique',
      gsmRange: '200-230 GSM',
      attributes: ['Pique Knit', 'Durable'],
    },
  ],
  'Recycled Polyester': [
    {
      key: 'rpet_interlock',
      name: 'rPET Interlock',
      gsmRange: '140-170 GSM',
      attributes: ['Recycled Fibers', 'Quick-Dry'],
    },
  ],
  'Stretch Cotton': [
    {
      key: 'cotton_elastane',
      name: 'Cotton Elastane Jersey',
      gsmRange: '170-210 GSM',
      attributes: ['Stretch', 'Comfort'],
    },
  ],
  'Stretch Fabric': [
    {
      key: 'stretch_woven',
      name: 'Stretch Woven',
      gsmRange: '160-240 GSM',
      attributes: ['Mechanical Stretch', 'Comfort'],
    },
  ],
  Jersey: [
    {
      key: 'jersey_cotton',
      name: 'Cotton Jersey',
      gsmRange: '150-180 GSM',
      attributes: ['Combed', 'Ring-Spun'],
    },
  ],
};

export default materialTypes;
