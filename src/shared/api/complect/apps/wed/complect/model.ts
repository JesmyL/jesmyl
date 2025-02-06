export enum WedGuestConversation {
  Single,
  Join,
}

export enum WedGuestWillBe {
  No,
  Yes,
}

export enum WedGuestSex {
  Woman,
  Man,
}

export enum WedGuestPropositionSent {
  No,
  Yes,
}

export enum FirstName {
  def = '',
}

export enum LastName {
  def = '',
}

export enum WifeName {
  def = '',
}

export enum WedGuestComment {
  def = '',
}

export interface WedGuest {
  mi?: number;
  fn: FirstName;
  ln?: LastName;
  wn?: WifeName;
  c: WedGuestConversation;
  s: WedGuestSex;
  w?: WedGuestWillBe;
  t?: WedGuestComment;
  g?: WedGuestPropositionSent;
}

export interface WedStorage {
  guests: WedGuest[];
}
