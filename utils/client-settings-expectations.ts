export type ClientSettingsMediaType = 'banner' | 'video' | 'native' | 'audio' | 'ctv';

export type ObjectiveUnitsExpectation =
  | {
      type: 'literal';
      value: number;
    }
  | {
      type: 'reflect_bid_cpm';
    };

export type ObjectiveDefaultExpectation = {
  objectiveType: string;
  goal: string;
  mediaType: ClientSettingsMediaType;
  unitsValue: ObjectiveUnitsExpectation;
};

export type ClientSettingsExpectationProfile = {
  key: string;
  billingCpm: Record<ClientSettingsMediaType, number>;
  bidCpm: Record<ClientSettingsMediaType, number>;
  objectiveDefaults: ObjectiveDefaultExpectation[];
};

const DEFAULT_MEDIAMATH_PROFILE: ClientSettingsExpectationProfile = {
  key: 'mediamath-defaults',
  billingCpm: {
    banner: 6,
    video: 15,
    native: 10,
    audio: 20,
    ctv: 50
  },
  bidCpm: {
    banner: 0.9,
    video: 4,
    native: 1,
    audio: 6,
    ctv: 9
  },
  objectiveDefaults: [
    { objectiveType: 'Awareness', goal: 'Reach', mediaType: 'banner', unitsValue: { type: 'literal', value: 3 } },
    { objectiveType: 'Awareness', goal: 'Reach', mediaType: 'video', unitsValue: { type: 'reflect_bid_cpm' } },
    { objectiveType: 'Awareness', goal: 'Reach', mediaType: 'native', unitsValue: { type: 'reflect_bid_cpm' } },
    { objectiveType: 'Awareness', goal: 'Reach', mediaType: 'audio', unitsValue: { type: 'reflect_bid_cpm' } },
    { objectiveType: 'Awareness', goal: 'Reach', mediaType: 'ctv', unitsValue: { type: 'reflect_bid_cpm' } },
    { objectiveType: 'Engagement', goal: 'CTR', mediaType: 'banner', unitsValue: { type: 'literal', value: 0.08 } },
    { objectiveType: 'Engagement', goal: 'CTR', mediaType: 'video', unitsValue: { type: 'literal', value: 0.15 } },
    { objectiveType: 'Engagement', goal: 'CTR', mediaType: 'native', unitsValue: { type: 'literal', value: 0.2 } },
    { objectiveType: 'Engagement', goal: 'Site Visits', mediaType: 'banner', unitsValue: { type: 'literal', value: 3 } },
    { objectiveType: 'Engagement', goal: 'Site Visits', mediaType: 'video', unitsValue: { type: 'literal', value: 3 } },
    { objectiveType: 'Engagement', goal: 'Site Visits', mediaType: 'native', unitsValue: { type: 'literal', value: 3 } },
    { objectiveType: 'Conversion', goal: 'Conversion', mediaType: 'banner', unitsValue: { type: 'literal', value: 6 } },
    { objectiveType: 'Conversion', goal: 'Conversion', mediaType: 'video', unitsValue: { type: 'literal', value: 6 } },
    { objectiveType: 'Conversion', goal: 'Conversion', mediaType: 'native', unitsValue: { type: 'literal', value: 6 } },
    { objectiveType: 'Awareness', goal: 'Completion', mediaType: 'video', unitsValue: { type: 'literal', value: 70 } },
    { objectiveType: 'Awareness', goal: 'Completion', mediaType: 'audio', unitsValue: { type: 'literal', value: 70 } },
    { objectiveType: 'Awareness', goal: 'Completion', mediaType: 'ctv', unitsValue: { type: 'literal', value: 90 } },
    { objectiveType: 'Awareness', goal: 'Viewability', mediaType: 'banner', unitsValue: { type: 'literal', value: 40 } },
    { objectiveType: 'Awareness', goal: 'Viewability', mediaType: 'video', unitsValue: { type: 'literal', value: 70 } }
  ]
};

const EXPECTATION_PROFILES = new Map<string, ClientSettingsExpectationProfile>([
  [normalizeToken(DEFAULT_MEDIAMATH_PROFILE.key), DEFAULT_MEDIAMATH_PROFILE],
  [normalizeToken('default'), DEFAULT_MEDIAMATH_PROFILE],
  [normalizeToken('mediamath'), DEFAULT_MEDIAMATH_PROFILE]
]);

function normalizeToken(value?: string): string {
  return (value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

export function resolveClientSettingsMediaType(value?: string): ClientSettingsMediaType {
  const normalized = normalizeToken(value);

  switch (normalized) {
    case 'banner':
    case 'display':
      return 'banner';
    case 'video':
      return 'video';
    case 'native':
      return 'native';
    case 'audio':
      return 'audio';
    case 'ctv':
    case 'connected_tv':
    case 'connectedtv':
      return 'ctv';
    default:
      throw new Error(`Unsupported creative/media type "${value || '<empty>'}" for client-settings defaults verification.`);
  }
}

export function getClientSettingsExpectationProfile(profileName?: string): ClientSettingsExpectationProfile {
  const profile = EXPECTATION_PROFILES.get(normalizeToken(profileName)) || DEFAULT_MEDIAMATH_PROFILE;
  return profile;
}

export function resolveObjectiveUnitsExpectation(
  profile: ClientSettingsExpectationProfile,
  objectiveType: string,
  goal: string,
  mediaType: ClientSettingsMediaType
): number {
  const match = profile.objectiveDefaults.find(
    (item) =>
      normalizeToken(item.objectiveType) === normalizeToken(objectiveType) &&
      normalizeToken(item.goal) === normalizeToken(goal) &&
      item.mediaType === mediaType
  );

  if (!match) {
    throw new Error(
      `No objective default expectation exists for objective type "${objectiveType}", goal "${goal}", and media type "${mediaType}".`
    );
  }

  if (match.unitsValue.type === 'reflect_bid_cpm') {
    return profile.bidCpm[mediaType];
  }

  return match.unitsValue.value;
}

export function resolveObjectiveUnitsExpectationRule(
  profile: ClientSettingsExpectationProfile,
  objectiveType: string,
  goal: string,
  mediaType: ClientSettingsMediaType
): ObjectiveUnitsExpectation {
  const match = profile.objectiveDefaults.find(
    (item) =>
      normalizeToken(item.objectiveType) === normalizeToken(objectiveType) &&
      normalizeToken(item.goal) === normalizeToken(goal) &&
      item.mediaType === mediaType
  );

  if (!match) {
    throw new Error(
      `No objective default expectation exists for objective type "${objectiveType}", goal "${goal}", and media type "${mediaType}".`
    );
  }

  return match.unitsValue;
}
