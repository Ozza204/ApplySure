export type CheckResultStatus = 'passed' | 'failed' | 'needs_confirmation' | 'not_applicable'
export interface AffectedReference { kind: 'field' | 'document'; identifier: string }
export interface CheckFinding {
  requirement_id: string
  result: CheckResultStatus
  affected: AffectedReference | null
  explanation: string
  suggested_fix: string | null
  source_reference: string | null
}
export interface ApplicationCheck {
  check_id: string
  application_id: string
  requirement_version: string
  findings: CheckFinding[]
  demo_fixture: boolean
}
export interface Profile { id: string; display_name: string | null; province: string | null }
export interface DocumentRecord { id: string; type: string; subject_id: string; processing_status: 'pending' | 'ready' | 'failed' }
export interface Bursary { id: string; title: string; funder: string; deadline: string | null; official_source_url: string }
export interface Application { id: string; bursary_id: string; status: 'preparing' | 'ready' | 'submitted' }
