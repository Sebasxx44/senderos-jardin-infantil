import { ActionHeaderTA } from "@/components/ActionHeaderTA.js";
import { useScrollGarden } from "@/composables/useScrollGarden.js";
import { useMediaGallery } from "@/composables/useMediaGallery.js";
import { useVisitRequest } from "@/composables/useVisitRequest.js";

// ==================== INITIALIZATION ====================
ActionHeaderTA();
useScrollGarden();
useMediaGallery();
useVisitRequest();
