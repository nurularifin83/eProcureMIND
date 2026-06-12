export const users = {
  admin: {
    username: process.env.ADMIN_USERNAME!,
    password: process.env.ADMIN_PASSWORD!,
  },
  vendor: {
    username: process.env.VENDOR_USERNAME!,
    password: process.env.VENDOR_PASSWORD!,
  },
  HSESpecialist: {
    username: process.env.HSE_USERNAME!,
    password: process.env.HSE_PASSWORD!,
  },
  adminSCM: {
    username: process.env.ADMIN_SCM_USERNAME!,
    password: process.env.ADMIN_SCM_PASSWORD!,
  },
  VML: {
    username: process.env.VML_USERNAME!,
    password: process.env.VML_PASSWORD!,
  },
  HeadSCM: {
    username: process.env.HEAD_SCM_USERNAME!,
    password: process.env.HEAD_SCM_PASSWORD!,
  },
  creatorProcplan: {
    username: process.env.CREATOR_PROCPLAN_USERNAME!,
    password: process.env.CREATOR_PROCPLAN_PASSWORD!,
  },
  requesterProcplan: {
    username: process.env.REQUESTER_PROCPLAN_USERNAME!,
    password: process.env.REQUESTER_PROCPLAN_PASSWORD!,
  },
  confirmerProcplan: {
    username: process.env.CONFIRMER_PROCPLAN_USERNAME!,
    password: process.env.CONFIRMER_PROCPLAN_PASSWORD!,
  },
  reviewerProcplan: {
    username: process.env.REVIEWER_PROCPLAN_USERNAME!,
    password: process.env.REVIEWER_PROCPLAN_PASSWORD!,
  },
}