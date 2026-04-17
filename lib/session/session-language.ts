import type { Recommendation } from "@/lib/types/result";
import type {
  BookmarkType,
  SessionConversationFlowState,
  SessionLanguage,
} from "@/lib/types/session";

export const DEFAULT_SESSION_LANGUAGE = "en" as const satisfies SessionLanguage;

const BOOKMARK_LABELS: Record<SessionLanguage, Record<BookmarkType, string>> = {
  en: {
    sound: "Sound",
    leak: "Leak",
    rust: "Rust",
    connector: "Connector",
    light: "Light",
    belt_pulley: "Belt/Pulley",
    other: "Other",
  },
  ko: {
    sound: "소리",
    leak: "누유",
    rust: "녹",
    connector: "커넥터",
    light: "등화",
    belt_pulley: "벨트/풀리",
    other: "기타",
  },
};

const FLOW_STATUS_LABELS: Record<
  SessionLanguage,
  Record<SessionConversationFlowState, string>
> = {
  en: {
    idle: "Idle",
    connecting: "Connecting",
    listening: "Listening",
    processing: "Processing",
    assistant_responding: "Responding",
    failed: "Failed",
  },
  ko: {
    idle: "대기",
    connecting: "연결 중",
    listening: "듣는 중",
    processing: "처리 중",
    assistant_responding: "응답 중",
    failed: "실패",
  },
};

const RECOMMENDATION_LABELS: Record<
  SessionLanguage,
  Record<Recommendation, string>
> = {
  en: {
    DIY_SAFE: "DIY safe",
    INSPECT_ONLY: "Inspect only",
    SHOP_REQUIRED: "Shop required",
  },
  ko: {
    DIY_SAFE: "직접 점검 가능",
    INSPECT_ONLY: "추가 점검 필요",
    SHOP_REQUIRED: "정비소 권장",
  },
};

const EXACT_KOREAN_TRANSLATIONS: Record<string, string> = {
  "App inspection context.": "앱 점검 문맥.",
  "Latest bookmark: none.": "최근 북마크: 없음.",
  "Keep the next reply short and inspection-directed.":
    "다음 응답은 짧고 점검 지시 중심으로 유지하세요.",
  "Manual inspection frame from the current camera view.":
    "현재 카메라 화면에서 저장한 수동 점검 프레임입니다.",
  "Review the current frame.": "현재 프레임을 다시 확인하세요.",
  "Session started.": "세션이 시작되었습니다.",
  "Session ended.": "세션이 종료되었습니다.",
  "Rear camera live.": "후면 카메라 활성화됨.",
  "Frame captured.": "프레임 저장됨.",
  "Bookmark saved.": "북마크 저장됨.",
  "Frame saved": "프레임 저장",
  "Preview unavailable": "미리보기 사용 불가",
  "Torch on": "플래시 켜짐",
  "Torch off": "플래시 꺼짐",
  "Torch unavailable": "플래시 사용 불가",
  "Talk unavailable. Try again.": "대화 연결 불가. 다시 시도하세요.",
  "Live talk disabled.": "실시간 대화가 비활성화되었습니다.",
  "Gemini key missing on server.": "서버에 Gemini 키가 없습니다.",
  "Mic blocked": "마이크 차단됨",
  "Mic unavailable": "마이크 사용 불가",
  "Reply timeout. Try again.": "응답 시간 초과. 다시 시도하세요.",
  "Talk lost. Retry.": "대화 연결 끊김. 다시 시도하세요.",
  "Talk back": "대화 재연결됨",
  "Retrying talk": "대화 재연결 중",
  "Reply interrupted": "응답이 중단되었습니다",
  "Bookmark context:": "북마크 문맥:",
  "User note:": "사용자 메모:",
  "Camera live": "카메라 켜짐",
  "Camera blocked": "카메라 차단됨",
  "Try again": "다시 시도",
  "Opening camera": "카메라 여는 중",
  "Camera off": "카메라 꺼짐",
  "Use HTTPS or Safari": "HTTPS 또는 Safari 사용",
  "Use HTTPS": "HTTPS 사용",
  "Open in Safari": "Safari에서 열기",
  "Voice unavailable": "음성 출력 사용 불가",
  "Rear camera live": "후면 카메라 켜짐",
  "Mic ready": "마이크 준비됨",
  "Mic optional": "마이크 선택 사항",
  "Checking mic": "마이크 확인 중",
  "Camera busy": "카메라 사용 중",
  "Mic busy": "마이크 사용 중",
  "Captured and sent": "저장 후 전송됨",
  "Saved from live preview": "실시간 화면에서 저장됨",
  "Sampled visual context": "샘플 시각 문맥",
  "Bookmark context sent": "북마크 문맥 전송됨",
  "Bookmark frame saved": "북마크 프레임 저장됨",
  "No evidence yet.": "아직 기록이 없습니다.",
  "Marked without note": "메모 없이 저장됨",
  "Result": "결과",
  "Loading session evidence": "세션 기록 불러오는 중",
  "Building a mock result from saved session evidence.":
    "저장된 세션 기록으로 결과를 만드는 중입니다.",
  "No bookmarks were saved in this session.":
    "이 세션에는 저장된 북마크가 없습니다.",
  "No saved evidence matched a stronger mock rule yet.":
    "아직 더 강한 규칙과 일치하는 저장 기록이 없습니다.",
  "Back to session": "세션으로 돌아가기",
  "Home": "홈",
  "Based on": "근거",
  "Start session": "세션 시작",
  "Mock mode on.": "모의 모드 켜짐.",
  "Open session": "세션 열기",
  "Notes": "노트",
  "Language": "언어",
  "Locked": "고정됨",
  "Bookmark": "북마크",
  "Timeline": "타임라인",
  "Close": "닫기",
  "Quick": "빠르게",
  "Note": "메모",
  "Save mark": "마크 저장",
  "Tap a type to save it.": "유형을 탭해 바로 저장하세요.",
  "Heard": "인식",
  "Next": "다음",
  "Frame": "프레임",
  "Mark": "마크",
  "Buddy": "버디",
  "You": "나",
  "Accessory drive inspection": "액세서리 드라이브 점검",
  "Ticking or misfire near coil / plug area":
    "코일 / 플러그 주변의 타각음 또는 실화 점검",
  "Connector fitment check": "커넥터 체결 점검",
  "Leak source before driving": "주행 전 누유 시작 지점 확인",
  "Rust area close inspection": "녹 부위 근접 점검",
  "Fast turn-signal check": "빠른 방향지시등 점검",
  "Coolant smell needs source check": "냉각수 냄새 원인 확인 필요",
  "Vacuum line visual check": "진공 라인 육안 점검",
  "Battery terminal clean and verify": "배터리 터미널 청소 및 확인",
  "Multiple issue signals from this inspection need follow-up":
    "이번 점검에서는 여러 이상 신호가 확인되어 추가 확인이 필요합니다.",
  "This session shows more than one risk signal. Stop here, review the saved evidence, and verify the highest-risk area before driving again.":
    "이번 세션에서는 둘 이상의 위험 신호가 보였습니다. 여기서 멈추고 저장된 기록을 다시 확인한 뒤, 가장 위험한 부위를 먼저 확인하고 다시 주행하세요.",
  "The clearest leak, wobble, or rust area from the saved evidence":
    "저장된 기록 중 가장 뚜렷한 누유, 흔들림, 녹 부위",
  "Any connector, light, or pulley path that also looks damaged":
    "함께 손상돼 보이는 커넥터, 등화, 또는 풀리 경로",
  "Which issue appears most active right now before moving the truck":
    "트럭을 움직이기 전에 지금 가장 두드러지는 이상 부위",
  "This is a limited inspection aid, not a guaranteed diagnosis. Multiple issue signals in one session should be treated more cautiously than a single isolated mark.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 한 세션에서 여러 이상 신호가 보이면 단일 문제보다 더 신중하게 다뤄야 합니다.",
  "Possible fluid leak source in the engine bay or front underbody":
    "엔진룸 또는 전면 하부의 누유 시작 지점 가능성",
  "Inspect the fluid source before driving again. If the leak is fresh, spreading, or the fluid type is unclear, stop here and use a shop.":
    "다시 주행하기 전에 누유 시작 지점을 먼저 확인하세요. 새로 번지는 누유이거나 액체 종류가 불분명하면 여기서 멈추고 정비소를 이용하세요.",
  "Fresh wet trail above the drip point": "떨어지는 지점 위쪽의 신선한 젖은 자국",
  "Reservoir and hose connections near the leak path":
    "누유 경로 주변의 리저버와 호스 연결부",
  "Fluid color and smell before topping anything off":
    "보충하기 전에 액체의 색과 냄새",
  "This is a limited inspection aid, not a guaranteed diagnosis. If the leak source is unclear, do not keep driving it.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 누유 시작 지점이 불분명하면 계속 주행하지 마세요.",
  "Front accessory drive, belt tracking, or pulley wobble":
    "전면 액세서리 드라이브, 벨트 트래킹, 또는 풀리 흔들림",
  "With the engine off and cooled, inspect the front belt path for wobble, misalignment, shiny rub marks, or frayed edges.":
    "엔진을 끄고 충분히 식힌 뒤, 전면 벨트 경로의 흔들림, 어긋남, 반짝이는 마찰 자국, 해진 가장자리를 확인하세요.",
  "Tensioner and idler pulley wobble": "텐셔너와 아이들 풀리 흔들림",
  "Belt edge wear or belt dust around the front drive path":
    "전면 드라이브 경로 주변의 벨트 가장자리 마모 또는 벨트 가루",
  "Any pulley that feels loose, noisy, or out of line":
    "헐겁거나 소리가 나거나 정렬이 어긋난 풀리",
  "This is a limited inspection aid, not a guaranteed diagnosis. Stop here if any pulley feels loose or the belt path looks unstable.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 풀리가 헐겁거나 벨트 경로가 불안정해 보이면 여기서 멈추세요.",
  "Front accessory drive / belt and pulley path":
    "전면 액세서리 드라이브 / 벨트 및 풀리 경로",
  "Inspect the belt path with the engine off and look for cracked edges, dust, or pulley misalignment before driving further.":
    "엔진을 끈 상태에서 벨트 경로를 확인하고, 더 주행하기 전에 갈라진 가장자리, 가루, 풀리 정렬 불량을 살펴보세요.",
  "Belt edge wear around the accessory drive":
    "액세서리 드라이브 주변의 벨트 가장자리 마모",
  "Pulley alignment across the front drive path":
    "전면 드라이브 경로 전체의 풀리 정렬 상태",
  "Dust, polish marks, or wobble near the tensioner and idler":
    "텐셔너와 아이들 주변의 가루, 광택 자국, 또는 흔들림",
  "This is a limited inspection aid, not a guaranteed diagnosis. If anything looks loose or the belt path is unclear, stop here and use a shop.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 헐거워 보이는 부품이 있거나 벨트 경로가 불분명하면 여기서 멈추고 정비소를 이용하세요.",
  "Exterior light, bulb, socket, or wiring connection":
    "외부 등화, 전구, 소켓, 또는 배선 연결부",
  "Start with a bulb and socket check. Clean light corrosion and confirm the connector is seated before replacing parts.":
    "먼저 전구와 소켓부터 확인하세요. 부품을 교체하기 전에 가벼운 부식을 청소하고 커넥터가 제대로 체결됐는지 확인하세요.",
  "Bulb filament or LED unit condition": "전구 필라멘트 또는 LED 유닛 상태",
  "Socket corrosion or heat damage": "소켓 부식 또는 열 손상",
  "Connector fitment and obvious wiring damage":
    "커넥터 체결 상태와 눈에 보이는 배선 손상",
  "This is a limited inspection aid, not a guaranteed diagnosis. Stop if you find melted wiring or repeated fuse issues.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 녹은 배선이나 반복되는 퓨즈 문제가 보이면 중단하세요.",
  "Connector fitment, corrosion, or broken retaining tab":
    "커넥터 체결 불량, 부식, 또는 고정 탭 손상",
  "Inspect the connector by hand with the engine off. Check for a loose fit, corrosion, or a broken lock tab before driving.":
    "엔진을 끈 상태에서 커넥터를 손으로 확인하세요. 주행 전에 헐거운 체결, 부식, 또는 손상된 락 탭이 있는지 확인하세요.",
  "Green or white corrosion in the connector":
    "커넥터 내부의 녹색 또는 흰색 부식",
  "Loose pins or a connector that will not stay seated":
    "헐거운 핀 또는 제대로 고정되지 않는 커넥터",
  "Broken plastic tab or strain near the wire entry":
    "배선 진입부 주변의 깨진 플라스틱 탭 또는 장력 흔적",
  "This is a limited inspection aid, not a guaranteed diagnosis. If the connector serves a critical engine function, stop and verify the fit before driving.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 이 커넥터가 중요한 엔진 기능과 관련되면 주행 전에 체결 상태를 꼭 확인하세요.",
  "Wheel well or underbody rust spot": "휠하우스 또는 하부의 녹 부위",
  "Inspect the rust area closely and confirm whether it is only surface rust or if the metal is flaking, swollen, or perforated.":
    "녹 부위를 가까이서 보고 표면 녹인지, 금속이 들뜨거나 부풀거나 구멍이 났는지 확인하세요.",
  "Wheel well lip and underbody seams": "휠하우스 립과 하부 이음부",
  "Brake and fuel line nearby condition": "근처 브레이크 라인 및 연료 라인 상태",
  "Any flaking metal or soft spot around the rust mark":
    "녹 부위 주변의 들뜬 금속 또는 약해진 부분",
  "This is a limited inspection aid, not a guaranteed diagnosis. Stop here if the rust is structural or close to brake or fuel hardware.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 녹이 구조 부위이거나 브레이크/연료 하드웨어 근처라면 여기서 멈추세요.",
  "Unconfirmed sound source in the engine bay or front drive area":
    "엔진룸 또는 전면 드라이브 구역의 미확인 소리 원인",
  "Add another clear frame and hold the phone steady where the sound is strongest before deciding whether it is safe to keep driving.":
    "계속 주행해도 되는지 판단하기 전에, 소리가 가장 큰 지점에서 휴대폰을 고정해 프레임을 하나 더 저장하세요.",
  "Whether the sound follows the belt path or a single pulley":
    "소리가 벨트 경로 전체를 따라가는지, 특정 풀리 하나인지",
  "Changes in sound as the phone moves across the engine bay":
    "휴대폰을 엔진룸 across로 움직일 때 소리 변화",
  "Any visible shake, rub mark, or loose connector near the sound":
    "소리 주변의 흔들림, 마찰 자국, 또는 헐거운 커넥터",
  "This is a limited inspection aid, not a guaranteed diagnosis. If the sound is sharp, sudden, or worsening, stop here and use a shop.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 소리가 날카롭거나 갑작스럽거나 점점 심해지면 여기서 멈추고 정비소를 이용하세요.",
  "General visual inspection with limited evidence":
    "제한된 기록에 기반한 일반 시각 점검",
  "Review the saved frames and add a bookmark where the issue is most obvious before deciding on a repair path.":
    "수리 방향을 정하기 전에 저장된 프레임을 다시 보고, 문제가 가장 분명한 지점에 북마크를 추가하세요.",
  "One clear close frame of the suspected issue":
    "의심 부위를 가까이서 선명하게 보여주는 프레임 1장",
  "A wider frame for location context": "위치 문맥을 보여주는 넓은 프레임 1장",
  "A bookmark for the exact area that needs follow-up":
    "추가 확인이 필요한 정확한 부위의 북마크",
  "This is a limited inspection aid, not a guaranteed diagnosis. Add more evidence if the problem area is still unclear.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 문제 부위가 여전히 불분명하면 기록을 더 추가하세요.",
  "Not enough evidence from this session": "이 세션에는 아직 충분한 기록이 없습니다.",
  "Open the camera, capture a few clear frames, and add a bookmark where the issue is most visible or loud.":
    "카메라를 켜고 선명한 프레임 몇 장을 저장한 뒤, 문제가 가장 잘 보이거나 가장 크게 들리는 지점에 북마크를 추가하세요.",
  "One clear frame of the problem area": "문제 부위를 선명하게 보여주는 프레임 1장",
  "A bookmark for the main issue type": "주요 문제 유형에 대한 북마크",
  "A short note if the issue only appears at one spot":
    "문제가 특정 지점에서만 보인다면 짧은 메모",
  "This is a limited inspection aid, not a guaranteed diagnosis. The result improves only when the session includes clear evidence.":
    "이 도구는 제한적인 점검 보조이며 확정 진단이 아닙니다. 세션에 선명한 기록이 포함될수록 결과가 좋아집니다.",
};

export function resolveSessionLanguage(value: string | null | undefined): SessionLanguage {
  return value === "ko" ? "ko" : "en";
}

export function getSessionLanguageButtonLabel(language: SessionLanguage) {
  return language === "ko" ? "KOR" : "ENG";
}

export function getLocalizedBookmarkTypeLabel(
  bookmarkType: BookmarkType,
  language: SessionLanguage,
) {
  return BOOKMARK_LABELS[language][bookmarkType];
}

export function getConversationFlowLabel(
  language: SessionLanguage,
  state: SessionConversationFlowState,
) {
  return FLOW_STATUS_LABELS[language][state];
}

export function getRecommendationLabel(
  language: SessionLanguage,
  recommendation: Recommendation,
) {
  return RECOMMENDATION_LABELS[language][recommendation];
}

export function getSessionCopy(language: SessionLanguage) {
  if (language === "ko") {
    return {
      bookmark: "북마크",
      close: "닫기",
      heard: "인식",
      language: "언어",
      locked: "고정",
      next: "다음",
      note: "메모",
      notePlaceholder: "짧은 메모",
      noteToggle: "메모",
      quick: "빠르게",
      saveMark: "마크 저장",
      tapTypeToSave: "유형을 탭해 바로 저장하세요.",
      timeline: "타임라인",
      noEvidence: "아직 기록이 없습니다.",
      talk: "대화",
      stop: "중지",
      voiceOff: "음성 끔",
      voiceOn: "음성 켬",
      capture: "캡처",
      torch: "플래시",
      end: "종료",
    };
  }

  return {
    bookmark: "Bookmark",
    close: "Close",
    heard: "Heard",
    language: "Language",
    locked: "Locked",
    next: "Next",
    note: "Note",
    notePlaceholder: "Short note",
    noteToggle: "Note",
    quick: "Quick",
    saveMark: "Save mark",
    tapTypeToSave: "Tap a type to save it.",
    timeline: "Timeline",
    noEvidence: "No evidence yet.",
    talk: "Talk",
    stop: "Stop",
    voiceOff: "Voice off",
    voiceOn: "Voice on",
    capture: "Capture",
    torch: "Torch",
    end: "End",
  };
}

export function getHomeCopy(
  language: SessionLanguage,
  providerMode: "gemini" | "mock" = "mock",
) {
  if (language === "ko") {
    return {
      description: "2010 F-150 5.4 Triton",
      eyebrow: "홈",
      modeOn:
        providerMode === "gemini" ? "Gemini 모드 켜짐." : "모의 모드 켜짐.",
      notes: "노트",
      openSession: "세션 열기",
      title: "세션 시작",
    };
  }

  return {
    description: "2010 F-150 5.4 Triton",
    eyebrow: "Home",
    modeOn: providerMode === "gemini" ? "Gemini mode on." : "Mock mode on.",
    notes: "Notes",
    openSession: "Open session",
    title: "Start session",
  };
}

export function getResultCopy(language: SessionLanguage) {
  if (language === "ko") {
    return {
      backToSession: "세션으로 돌아가기",
      basedOn: "근거",
      frames: "프레임",
      home: "홈",
      lines: "대화",
      loading: "세션 기록 불러오는 중",
      marks: "마크",
      noBookmarks: "이 세션에는 저장된 북마크가 없습니다.",
      noSupportingEvidence: "아직 더 강한 규칙과 일치하는 저장 기록이 없습니다.",
      result: "결과",
    };
  }

  return {
    backToSession: "Back to session",
    basedOn: "Based on",
    frames: "frames",
    home: "Home",
    lines: "lines",
    loading: "Loading session evidence",
    marks: "marks",
    noBookmarks: "No bookmarks were saved in this session.",
    noSupportingEvidence: "No saved evidence matched a stronger mock rule yet.",
    result: "Result",
  };
}

export function getMatchedRuleLabel(
  language: SessionLanguage,
  rule: string,
) {
  const english: Record<string, string> = {
    multiple_risk_signals: "multiple risk signals",
    leak: "leak concern",
    sound_belt_pulley: "sound + belt path",
    belt_pulley: "belt / pulley",
    light: "light circuit",
    connector: "connector fitment",
    rust: "rust check",
    sound: "sound follow-up",
    frames_only: "frames only",
    insufficient_evidence: "limited evidence",
  };

  const korean: Record<string, string> = {
    multiple_risk_signals: "복수 위험 신호",
    leak: "누유 우려",
    sound_belt_pulley: "소리 + 벨트 경로",
    belt_pulley: "벨트 / 풀리",
    light: "등화 회로",
    connector: "커넥터 체결",
    rust: "녹 점검",
    sound: "소리 추가 확인",
    frames_only: "프레임만 있음",
    insufficient_evidence: "기록 부족",
  };

  return language === "ko" ? korean[rule] ?? rule : english[rule] ?? rule;
}

export function getSeverityLabel(
  language: SessionLanguage,
  severity: "green" | "yellow" | "red",
) {
  if (language === "ko") {
    return {
      green: "낮음",
      yellow: "주의",
      red: "높음",
    }[severity];
  }

  return severity;
}

export function translateExactText(
  language: SessionLanguage,
  value: string,
) {
  if (language === "en") {
    return value;
  }

  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return value;
  }

  if (trimmedValue.startsWith("Latest bookmark: ")) {
    const bookmarkText = trimmedValue
      .replace("Latest bookmark: ", "")
      .replace(/\.$/, "");

    return `최근 북마크: ${bookmarkText}.`;
  }

  if (trimmedValue.startsWith("Saved frames: ")) {
    return trimmedValue.replace("Saved frames:", "저장된 프레임:");
  }

  if (trimmedValue.startsWith("Conversation lines: ")) {
    return trimmedValue.replace("Conversation lines:", "대화 줄 수:");
  }

  if (trimmedValue.startsWith("Next target: ")) {
    return trimmedValue.replace("Next target:", "다음 목표:");
  }

  if (trimmedValue.startsWith("Focus area: ")) {
    return trimmedValue.replace("Focus area:", "집중 부위:");
  }

  if (trimmedValue.startsWith("Reason: ")) {
    return trimmedValue.replace("Reason:", "이유:");
  }

  const itemCountMatch = trimmedValue.match(/^(\d+)\sitems$/);

  if (itemCountMatch) {
    return `${itemCountMatch[1]}개 항목`;
  }

  if (trimmedValue.startsWith("Gemini Live closed")) {
    return trimmedValue
      .replace("Gemini Live closed", "Gemini Live 연결 종료")
      .replace("Internal error encountered.", "내부 오류가 발생했습니다.");
  }

  return EXACT_KOREAN_TRANSLATIONS[trimmedValue] ?? value;
}

export function formatHistoryCountLabel(
  language: SessionLanguage,
  captureCount: number,
  bookmarkCount: number,
  conversationCount: number,
) {
  if (language === "ko") {
    return `${captureCount} 프레임 · ${bookmarkCount} 마크 · ${conversationCount} 대화`;
  }

  return `${captureCount} frames · ${bookmarkCount} marks · ${conversationCount} lines`;
}

export function formatResultEvidenceCountLabel(
  language: SessionLanguage,
  count: number,
  kind: "frames" | "marks" | "lines",
) {
  const copy = getResultCopy(language);

  if (kind === "frames") {
    return `${count} ${copy.frames}`;
  }

  if (kind === "marks") {
    return `${count} ${copy.marks}`;
  }

  return `${count} ${copy.lines}`;
}
