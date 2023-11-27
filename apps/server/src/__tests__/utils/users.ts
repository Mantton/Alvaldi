import { createAccount } from "@/v1/services/accounts.service";

export const TEST_USER_1 = {
  id: "user_2YkKmZL9FA64GaHlZsBahbTiPHm",
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yWWdFVnJ2RFpTU2pLbUc5VldLQm5MRkdtSWkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3JlZ3VsYXItdmlwZXItMTAuYWNjb3VudHMuZGV2IiwiZXhwIjoyMDE2NDI1MDc1LCJpYXQiOjE3MDEwNjUwNzUsImlzcyI6Imh0dHBzOi8vcmVndWxhci12aXBlci0xMC5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiJiZjQzMWEyY2M0OTI4MGY2NDc5ZCIsIm5iZiI6MTcwMTA2NTA3MCwic3ViIjoidXNlcl8yWWtLbVpMOUZBNjRHYUhsWnNCYWhiVGlQSG0ifQ.fdHRSCIz4tbelWySzP0flXitZRH2tG1zg8llzArV0FjiKtG1UKvLQopR__ZJ_Kf5gTPOKloWWF0FHZxSASIxiZhwQmCLVmG54ZP8FfIprGMyaPbHrxVVgtUTimMt4xsCOuayTQiprREceK0MmPnjOKzGrUd3AGfo1E5gbazrCBJBOMB_X86uPOhut7FNxjVfUlDqT5SoYpNv6w6Cq3WIKa729p9c5Mg21XYPSmoBr6edq4ZC8jWcFBBx8-o5vxHKsl-NayxUiq_4hrQNawnqJbwQyPF8s4c2Aeqmy6K7oLHUMXTARL6ocKAfGKWmFJ728Ai2rN9CYwPo5y1GAr-PRA",
};

export const TEST_USER_2 = {
  id: "user_2YkOMVGS0eWzj5FXou9ckeX9QTO",
  token:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6Imluc18yWWdFVnJ2RFpTU2pLbUc5VldLQm5MRkdtSWkiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3JlZ3VsYXItdmlwZXItMTAuYWNjb3VudHMuZGV2IiwiZXhwIjoyMDE2NDI2MDc0LCJpYXQiOjE3MDEwNjYwNzQsImlzcyI6Imh0dHBzOi8vcmVndWxhci12aXBlci0xMC5jbGVyay5hY2NvdW50cy5kZXYiLCJqdGkiOiI4YjEzMmJkNDgwZTMxNjI3MjQ0NCIsIm5iZiI6MTcwMTA2NjA2OSwic3ViIjoidXNlcl8yWWtPTVZHUzBlV3pqNUZYb3U5Y2tlWDlRVE8ifQ.H3BOi2tILJDk5kGHrV5RkpAelefmT6wfhJ8VvJO3HbSr7QnKZ3EaurKm5wRSTif6y6y_RhqYG-rgoEcdHQEadmqAHOWzsJZCePpha5P_0jGx4gHqT38Of5InjkdCuzaOt-JNnHEO-8Cucb-Wj5oIcW5ZgPwKTNEBVz2xUaSwr07JU4-Mfq-GF6kTiqRLmAPZq2g6OafTsifeBVskhormGNojzj3grD8K3VDUz2xLCmrlLF8btdvcJUp3ooY9KepwtwYAhFxcTP5vQ7_ZzqNfSmINFdQNfSLyJIlXUJ6BpjGnymEcJA6BH4CRnbEo4lxyQZTFcxPbOgXS2CO0wbkuoA",
};

export const createTestUser = async () => {
  return createAccount(TEST_USER_1.id);
};