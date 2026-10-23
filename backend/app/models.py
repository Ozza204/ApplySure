from enum import Enum
from uuid import UUID

from pydantic import BaseModel, Field


class CheckResultStatus(str, Enum):
    passed = "passed"
    failed = "failed"
    needs_confirmation = "needs_confirmation"
    not_applicable = "not_applicable"


class AffectedReference(BaseModel):
    kind: str = Field(pattern="^(field|document)$")
    identifier: str


class CheckFinding(BaseModel):
    requirement_id: UUID
    result: CheckResultStatus
    affected: AffectedReference | None = None
    explanation: str
    suggested_fix: str | None = None
    source_reference: str | None = None


class ApplicationCheck(BaseModel):
    check_id: UUID
    application_id: UUID
    requirement_version: str
    findings: list[CheckFinding]
    demo_fixture: bool = False
