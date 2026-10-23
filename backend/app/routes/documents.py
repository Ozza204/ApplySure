from fastapi import APIRouter

# Upload and processing routes are intentionally unavailable until ownership,
# content validation, malware scanning, and bounded extraction are implemented.
router = APIRouter(prefix="/api/documents", tags=["documents"])
