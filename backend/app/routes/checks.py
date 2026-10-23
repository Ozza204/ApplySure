from fastapi import APIRouter

# No production checker exists yet; see docs/api-contract.md.
router = APIRouter(prefix="/api/checks", tags=["checks"])
