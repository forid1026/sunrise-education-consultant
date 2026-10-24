<!-- pages/job-apply/[slug].vue -->
<script setup>
const config = useRuntimeConfig();
const siteUrl =
  (config.public.siteUrl || "https://sunrise-bd.net").replace(/\/+$/, "") + "/";
// NOTE: use the same API base your useApi() / apply-now page uses
const apiBase = config.public.apiBase;
const brand = "Sunrise Education Consultants";
const route = useRoute();
const slug = String(route.params.slug);
const pageUrl = `${siteUrl}job-apply/${slug}`;

/* ---------- Job (same key as the details page, so it is cached) ---------- */
const { data, pending, error, refresh } = await useApi(`/career/${slug}`, {
  key: `career-${slug}`,
  transform: (res) => res.data,
});
if (
  !data.value &&
  error.value &&
  (error.value.statusCode === 404 || error.value.status === 404)
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Job not found",
    fatal: true,
  });
}
const job = computed(() => data.value || null);

const fmt = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

/* ---------- Form ---------- */
const MIN_WHY = 500;
const MAX_CV = 5 * 1024 * 1024;

// Same order as the original form
const fields = [
  {
    key: "full_name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your full name",
    autocomplete: "name",
  },
  {
    key: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    autocomplete: "email",
  },
  {
    key: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "Enter phone number",
    autocomplete: "tel",
    inputmode: "tel",
  },
  {
    key: "expected_salary",
    label: "Expected Salary",
    type: "text",
    required: true,
    placeholder: "Enter your expected salary",
  },
  {
    key: "present_address",
    label: "Present Address",
    type: "text",
    required: true,
    placeholder: "Enter your present address",
    autocomplete: "street-address",
  },
  {
    key: "permanent_address",
    label: "Permanent Address",
    type: "text",
    required: false,
    placeholder: "Enter your permanent address",
  },
  {
    key: "joining_date",
    label: "Tentative Date to Join",
    type: "date",
    required: true,
    placeholder: "",
  },
  {
    key: "experience",
    label: "Experience",
    type: "text",
    required: true,
    placeholder: "e.g. 2 years",
  },
  {
    key: "current_company",
    label: "Current Company",
    type: "text",
    required: false,
    placeholder: "Enter your current company (if any)",
    autocomplete: "organization",
  },
];
const order = [...fields.map((f) => f.key), "cv", "why_select"];

const form = reactive({
  full_name: "",
  email: "",
  phone: "",
  expected_salary: "",
  present_address: "",
  permanent_address: "",
  joining_date: "",
  experience: "",
  current_company: "",
  why_select: "",
  website: "", // honeypot
});
const errors = reactive({});
const cv = ref(null);
const cvInput = ref(null);
const panel = ref(null);
const alertEl = ref(null);
const alertMsg = ref("");
const alertList = ref([]);
const showHelp = ref(false);
const sending = ref(false);
const done = ref(false);
const minDate = ref(undefined);

onMounted(() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  minDate.value = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
});

const whyLen = computed(() => form.why_select.trim().length);
const firstName = computed(
  () => form.full_name.trim().split(/\s+/)[0] || "there",
);
const fileSize = computed(() => {
  if (!cv.value) return "";
  const kb = cv.value.size / 1024;
  return kb >= 1024
    ? `${(kb / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(kb))} KB`;
});

const onFile = (e) => {
  errors.cv = "";
  const f = e.target.files?.[0] || null;
  if (!f) {
    cv.value = null;
    return;
  }
  const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name);
  if (!isPdf) {
    errors.cv = "Only PDF format is allowed.";
    clearFile();
    return;
  }
  if (f.size > MAX_CV) {
    errors.cv = "The CV must not be larger than 5 MB.";
    clearFile();
    return;
  }
  cv.value = f;
};
const clearFile = () => {
  cv.value = null;
  if (cvInput.value) cvInput.value.value = "";
};

const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k]);
  const v = (k) => String(form[k] || "").trim();

  if (!v("full_name")) errors.full_name = "Please enter your full name.";
  if (!v("email")) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v("email")))
    errors.email = "Please enter a valid email address.";
  if (!v("phone")) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(v("phone")))
    errors.phone = "Please enter a valid phone number.";
  if (!v("expected_salary"))
    errors.expected_salary = "Please enter your expected salary.";
  if (!v("present_address"))
    errors.present_address = "Please enter your present address.";
  if (!form.joining_date)
    errors.joining_date = "Please select a tentative joining date.";
  else if (minDate.value && form.joining_date < minDate.value)
    errors.joining_date = "The joining date cannot be in the past.";
  if (!v("experience"))
    errors.experience = "Please enter your experience, e.g. 2 years.";
  if (!cv.value) errors.cv = "Please upload your CV as a PDF.";
  if (!v("why_select"))
    errors.why_select = "Please tell us why we should select you.";
  else if (whyLen.value < MIN_WHY)
    errors.why_select = `Please write at least ${MIN_WHY} characters.`;

  return Object.keys(errors).length === 0;
};

const focusFirst = async () => {
  await nextTick();
  const key = order.find((k) => errors[k]);
  if (key) document.getElementById(`ja-${key}`)?.focus({ preventScroll: true });
};

// Scroll with an offset so the sticky header does not cover the target
const scrollToEl = (el, offset = 130) => {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
};

// Always shows the message at the TOP of the form
const showAlert = async (msg, { help = false, list = [] } = {}) => {
  alertMsg.value = msg;
  alertList.value = list;
  showHelp.value = help;
  await nextTick();
  alertEl.value?.focus({ preventScroll: true });
  scrollToEl(alertEl.value);
};

const submit = async () => {
  alertMsg.value = "";
  alertList.value = [];

  // 1) Client validation
  if (!validate()) {
    await showAlert("Please fix the following and submit again:", {
      list: Object.values(errors),
    });
    return focusFirst();
  }

  sending.value = true;
  try {
    const fd = new FormData();
    Object.entries(form).forEach(([k, val]) => {
      const s = typeof val === "string" ? val.trim() : val;
      if (s !== "" && s != null) fd.append(k, s);
    });
    fd.append("cv", cv.value);

    await $fetch(`${apiBase}/career/${slug}/apply`, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    });

    // 2) Success
    done.value = true;
    await nextTick();
    scrollToEl(panel.value);
  } catch (e) {
    const status = e?.statusCode || e?.response?.status;
    const body = e?.data || e?.response?._data;
    // Debug: shows the real reason in the browser console
    console.error("[job-apply] failed", status, body || e);

    if (status === 422 && body?.errors) {
      // Under each field + a summary at the top
      const list = [];
      Object.entries(body.errors).forEach(([k, msgs]) => {
        const m = Array.isArray(msgs) ? msgs[0] : String(msgs);
        errors[k] = m;
        list.push(m);
      });
      await showAlert(body.message || "Please fix the following:", { list });
    } else if (status === 410) {
      // Server says closed: reload the job, then tell the user
      await refresh();
      await showAlert(
        body?.message || "Applications for this position are closed.",
      );
    } else if (status === 429) {
      await showAlert(
        "Too many attempts. Please wait a few minutes and try again.",
      );
    } else if (status === 404) {
      await showAlert(
        "The application service was not found. Please contact us and we will help you apply.",
        { help: true },
      );
    } else {
      await showAlert(
        body?.message || "Something went wrong. Please try again.",
        { help: true },
      );
    }
  } finally {
    sending.value = false;
  }
};

/* ---------- SEO (a form page: do not index) ---------- */
const seoTitle = computed(() =>
  job.value
    ? `Apply for ${job.value.position} | Careers at ${brand}`
    : `Job Application | ${brand}`,
);
useSeoMeta({
  title: () => seoTitle.value,
  description: () =>
    `Apply online for ${job.value?.position || "a job"} at ${brand}.`,
  robots: "noindex, follow",
  ogTitle: () => seoTitle.value,
  ogUrl: pageUrl,
  ogSiteName: brand,
});
useHead({
  link: [{ rel: "canonical", href: `${siteUrl}career/${slug}` }],
});
</script>

<template>
  <div class="sap">
    <!-- ================= HERO ================= -->
    <section class="sap-hero" aria-labelledby="ja-h1">
      <div class="sap-hero-rays" aria-hidden="true"></div>
      <div class="sap-container">
        <nav class="sap-crumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span>/</span>
          <NuxtLink to="/about-us">About Us</NuxtLink><span>/</span>
          <NuxtLink to="/career">Careers</NuxtLink><span>/</span>
          <NuxtLink :to="`/career/${slug}`">{{
            job?.position || "Job"
          }}</NuxtLink
          ><span>/</span>
          <span aria-current="page">Apply</span>
        </nav>

        <span class="sap-eyebrow"><i></i>Job application</span>
        <h1 id="ja-h1" class="sap-h1">
          Apply for {{ job?.position || "this job" }}
          <span>at Sunrise Education Consultants</span>
        </h1>
        <p class="sap-sub">
          Fill in the form below and upload your CV. Our team reviews every
          application, and shortlisted candidates are contacted for an
          interview.
        </p>
        <ul class="sap-pills">
          <li>Takes about 5 minutes</li>
          <li>PDF CV, up to 5 MB</li>
          <li>Free to apply</li>
        </ul>
      </div>
    </section>

    <!-- ================= FORM ================= -->
    <section class="sap-section">
      <div class="sap-container">
        <p v-if="pending" class="sap-lead">Loading job…</p>

        <div v-else-if="error || !job" class="sap-panel ja-center">
          <p class="sap-lead">Could not load this job right now.</p>
          <button
            type="button"
            class="sap-btn sap-btn-primary"
            @click="refresh()"
          >
            Try again
          </button>
        </div>

        <div v-else class="sap-layout">
          <div ref="panel" class="sap-panel">
            <!-- success -->
            <div v-if="done" class="sap-done" role="status">
              <span class="sap-done-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.4"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              <h2 class="sap-h2">Application <span>received</span></h2>
              <p class="sap-lead">
                Thank you, {{ firstName }}. We have received your application
                for <b>{{ job.position }}</b
                >. Our team will review your CV and contact you if you are
                shortlisted.
              </p>
              <div class="sap-cta-row">
                <NuxtLink class="sap-btn sap-btn-primary" to="/career"
                  >See More Jobs</NuxtLink
                >
                <NuxtLink class="sap-btn sap-btn-ghost" to="/"
                  >Back to Home</NuxtLink
                >
              </div>
            </div>

            <!-- closed -->
            <div v-else-if="!job.is_open" class="sap-done">
              <h2 class="sap-h2">This role is <span>closed</span></h2>
              <p class="sap-lead">
                We are no longer accepting applications for {{ job.position }}.
                Please check our other open positions.
              </p>
              <div class="sap-cta-row">
                <NuxtLink class="sap-btn sap-btn-primary" to="/career"
                  >See Open Jobs</NuxtLink
                >
              </div>
            </div>

            <!-- form -->
            <form v-else novalidate @submit.prevent="submit">
              <div
                v-if="alertMsg"
                ref="alertEl"
                class="sap-alert"
                role="alert"
                tabindex="-1"
              >
                <b>{{ alertMsg }}</b>
                <ul v-if="alertList.length" class="ja-alert-list">
                  <li v-for="m in alertList" :key="m">{{ m }}</li>
                </ul>
                <template v-if="showHelp">
                  Or call us on <a href="tel:+8801911878274">01911 878 274</a>.
                </template>
              </div>

              <fieldset class="sap-group">
                <legend>Your details</legend>
                <div class="sap-row2">
                  <div
                    v-for="f in fields"
                    :key="f.key"
                    class="sap-field"
                    :class="{ 'has-err': errors[f.key] }"
                  >
                    <label :for="`ja-${f.key}`">
                      {{ f.label }}
                      <span v-if="f.required" class="sap-req">*</span>
                      <span v-else class="sap-opt">(optional)</span>
                    </label>
                    <input
                      :id="`ja-${f.key}`"
                      v-model="form[f.key]"
                      :type="f.type"
                      :name="f.key"
                      :placeholder="f.placeholder"
                      :autocomplete="f.autocomplete"
                      :inputmode="f.inputmode"
                      :min="f.type === 'date' ? minDate : undefined"
                      :aria-invalid="errors[f.key] ? 'true' : 'false'"
                      :aria-describedby="
                        errors[f.key] ? `ja-${f.key}-err` : undefined
                      "
                      @input="errors[f.key] = ''"
                    />
                    <small
                      v-if="errors[f.key]"
                      :id="`ja-${f.key}-err`"
                      class="sap-err"
                      >{{ errors[f.key] }}</small
                    >
                  </div>
                </div>
              </fieldset>

              <fieldset class="sap-group">
                <legend>Your application</legend>

                <div class="sap-field" :class="{ 'has-err': errors.cv }">
                  <label for="ja-cv"
                    >Upload CV (PDF) <span class="sap-req">*</span></label
                  >
                  <input
                    id="ja-cv"
                    ref="cvInput"
                    type="file"
                    name="cv"
                    accept="application/pdf,.pdf"
                    :aria-invalid="errors.cv ? 'true' : 'false'"
                    :aria-describedby="errors.cv ? 'ja-cv-err' : 'ja-cv-hint'"
                    @change="onFile"
                  />
                  <small v-if="cv" id="ja-cv-hint" class="ja-file">
                    {{ cv.name }} &middot; {{ fileSize }}
                    <button type="button" @click="clearFile">Remove</button>
                  </small>
                  <small v-else id="ja-cv-hint"
                    >Only PDF format allowed, up to 5 MB.</small
                  >
                  <small v-if="errors.cv" id="ja-cv-err" class="sap-err">{{
                    errors.cv
                  }}</small>
                </div>

                <div
                  class="sap-field"
                  :class="{ 'has-err': errors.why_select }"
                >
                  <label for="ja-why_select">
                    Why should we select you for this position?
                    <span class="sap-req">*</span>
                  </label>
                  <textarea
                    id="ja-why_select"
                    v-model="form.why_select"
                    name="why_select"
                    rows="7"
                    placeholder="Describe what makes you the ideal candidate for this role (minimum 500 characters)."
                    :aria-invalid="errors.why_select ? 'true' : 'false'"
                    :aria-describedby="`ja-why-count${errors.why_select ? ' ja-why_select-err' : ''}`"
                    @input="errors.why_select = ''"
                  ></textarea>
                  <small
                    id="ja-why-count"
                    class="ja-count"
                    :class="{ ok: whyLen >= MIN_WHY }"
                  >
                    {{ whyLen }} / {{ MIN_WHY }} characters minimum
                  </small>
                  <small
                    v-if="errors.why_select"
                    id="ja-why_select-err"
                    class="sap-err"
                    >{{ errors.why_select }}</small
                  >
                </div>
              </fieldset>

              <!-- honeypot: real people never see or fill this -->
              <div class="sap-hp" aria-hidden="true">
                <label
                  >Website
                  <input
                    v-model="form.website"
                    type="text"
                    tabindex="-1"
                    autocomplete="off"
                /></label>
              </div>

              <div class="sap-submit">
                <button
                  class="sap-btn sap-btn-primary"
                  type="submit"
                  :disabled="sending"
                >
                  {{ sending ? "Submitting…" : "Submit Application" }}
                </button>
                <NuxtLink class="sap-btn sap-btn-ghost" :to="`/career/${slug}`"
                  >Back to Job</NuxtLink
                >
              </div>
              <p class="sap-fine">
                Your details and CV are used only for recruitment at Sunrise
                Education Consultants and are not shared publicly.
              </p>
            </form>
          </div>

          <!-- sidebar -->
          <aside class="sap-aside">
            <div class="sap-card">
              <h2>You are applying for</h2>
              <p class="ja-pos">{{ job.position }}</p>
              <ul class="ja-job">
                <li v-if="job.department_label">
                  <span>Team</span><b>{{ job.department_label }}</b>
                </li>
                <li v-if="job.job_type">
                  <span>Job type</span><b>{{ job.job_type }}</b>
                </li>
                <li v-if="job.location">
                  <span>Location</span><b>{{ job.location }}</b>
                </li>
                <li v-if="job.experience">
                  <span>Experience</span><b>{{ job.experience }}</b>
                </li>
                <li v-if="job.deadline">
                  <span>Deadline</span><b>{{ fmt(job.deadline) }}</b>
                </li>
              </ul>
              <NuxtLink class="ja-link" :to="`/career/${slug}`"
                >Read the full job description &rarr;</NuxtLink
              >
            </div>

            <div class="sap-card">
              <h2>What happens next</h2>
              <ol class="sap-steps">
                <li>
                  <i>1</i>
                  <div>
                    <b>We review your CV</b
                    ><span
                      >Our team checks every application against the role.</span
                    >
                  </div>
                </li>
                <li>
                  <i>2</i>
                  <div>
                    <b>Interview</b
                    ><span
                      >Shortlisted candidates are invited to our office in
                      Dhaka.</span
                    >
                  </div>
                </li>
                <li>
                  <i>3</i>
                  <div>
                    <b>Offer</b
                    ><span
                      >Successful candidates receive an offer and
                      onboarding.</span
                    >
                  </div>
                </li>
              </ol>
            </div>

            <div class="sap-card">
              <h2>Need help?</h2>
              <ul class="sap-contact">
                <li>
                  <a href="tel:+8801911878274">
                    <span
                      ><svg viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.23Z"
                        /></svg
                    ></span>
                    01911 878 274
                  </a>
                </li>
                <li>
                  <a href="mailto:info@sunrise-bd.net">
                    <span
                      ><svg viewBox="0 0 24 24" fill="currentColor">
                        <path
                          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                        /></svg
                    ></span>
                    info@sunrise-bd.net
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ja-center {
  text-align: center;
  padding: 40px 32px;
}

/* top-of-form message (error summary), keeps clear of the sticky header */
.sap-alert {
  scroll-margin-top: 130px;
}
.ja-alert-list {
  margin: 8px 0;
  padding-left: 20px;
}
.ja-alert-list li {
  margin-bottom: 2px;
}

/* inputs that the global .sap-field rules do not cover (date + file) */
.sap-field input[type="date"],
.sap-field input[type="file"] {
  width: 100%;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  color: var(--sec-navy);
  padding: 12px 14px;
  border: 1.5px solid var(--sec-line);
  border-radius: 10px;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.sap-field input[type="date"]:focus,
.sap-field input[type="file"]:focus {
  outline: none;
  border-color: var(--sec-green);
  box-shadow: 0 0 0 4px rgba(47, 168, 79, 0.12);
}
.sap-field input[type="file"] {
  padding: 8px 10px;
  cursor: pointer;
}
.sap-field input[type="file"]::file-selector-button {
  margin-right: 14px;
  border: 0;
  border-radius: 8px;
  padding: 9px 16px;
  background: var(--sec-navy);
  color: #fff;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
}
.sap-field input[type="file"]::file-selector-button:hover {
  background: var(--sec-green-dk);
}
.sap-field textarea {
  min-height: 170px;
}

.ja-count {
  font-weight: 700;
}
.ja-count.ok {
  color: var(--sec-green-dk);
}
.ja-file {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-weight: 700;
  color: var(--sec-navy);
}
.ja-file button {
  border: 0;
  background: none;
  padding: 0;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 800;
  color: #d92d20;
  cursor: pointer;
  text-decoration: underline;
}

/* sidebar job summary */
.ja-pos {
  margin: 0 0 14px;
  font-size: 19px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--sec-green-dk);
}
.ja-job {
  margin: 0 0 14px;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
.ja-job li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--sec-offwhite);
  font-size: 13.5px;
}
.ja-job span {
  color: var(--sec-slate);
  font-weight: 600;
}
.ja-job b {
  text-align: right;
  color: var(--sec-navy);
}
.ja-link {
  font-size: 14px;
  font-weight: 800;
  color: var(--sec-green-dk);
  text-decoration: none;
}
.ja-link:hover {
  text-decoration: underline;
}
</style>
