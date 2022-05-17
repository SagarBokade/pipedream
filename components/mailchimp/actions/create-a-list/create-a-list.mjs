import { removeNullEntries } from "../../common/utils.mjs";
import mailchimp from "../../mailchimp.app.mjs";

export default {
  key: "mailchimp-create-a-list",
  name: "Create a List",
  description: "Creates a new list. [See docs here](https://mailchimp.com/developer/marketing/api/lists/)",
  version: "0.0.1",
  type: "action",
  props: {
    mailchimp,
    name: {
      type: "string",
      label: "Name",
      description: "The name of the list.",
      optional: true,
    },
    contactCompany: {
      type: "string",
      label: "Contact company",
      description: "The company name for the list.",
    },
    contactAddress1: {
      type: "string",
      label: "Contact address1",
      description: "The street address for the list contact.",
      optional: true,
    },
    contactCity: {
      type: "string",
      label: "Contact city",
      description: "The city for the list contact.",
    },
    contactState: {
      type: "string",
      label: "Contact state",
      description: "The state for the list contact.",
    },
    contactCountry: {
      type: "string",
      label: "Contact country",
      description: "A two-character ISO3166 country code. Defaults to US if invalid.",
    },
    contactPhone: {
      type: "string",
      label: "Contact phone",
      description: "The phone number for the list contact.",
      optional: true,
    },
    contactZip: {
      type: "string",
      label: "Contact zip code",
      description: "The postal or zip code for the list contact.",
      optional: true,
    },
    permissionReminder: {
      type: "string",
      label: "Permission reminder",
      description: "The [permission reminder](https://mailchimp.com/help/edit-the-permission-reminder/) for the list.",
    },
    campaignDefaultsFromName: {
      type: "string",
      label: "From name",
      description: "The default from name for campaigns sent to this list.",
    },
    campaignDefaultsFromEmail: {
      type: "string",
      label: "From email",
      description: "The default from email for campaigns sent to this list.",
    },
    campaignDefaultsSubject: {
      type: "string",
      label: "Subject",
      description: "The default subject line for campaigns sent to this list.",
    },
    campaignDefaultsLanguage: {
      type: "string",
      label: "Language",
      description: "The default language for this lists's forms.",
    },
    emailTypeOption: {
      type: "boolean",
      label: "Email type option",
      description: "Whether the list supports [multiple formats for emails](https://mailchimp.com/help/change-audience-name-defaults/).",
    },
    useArchiveBar: {
      type: "boolean",
      label: "Use archive bar",
      description: "Whether campaigns for this list use the [Archive Bar](https://mailchimp.com/help/about-email-campaign-archives-and-pages/) in archives by default.",
      optional: true,
    },
    notifyOnSubscribe: {
      type: "string",
      label: "Notify on subscribe",
      description: "The email address to send [subscribe notifications](https://mailchimp.com/help/change-subscribe-and-unsubscribe-notifications/) to.",
      optional: true,
    },
    notifyOnUnsubscribe: {
      type: "string",
      label: "Notify on unsubscribe",
      description: "The email address to send [subscribe notifications](https://mailchimp.com/help/change-subscribe-and-unsubscribe-notifications/) to.",
      optional: true,
    },
    doubleOptin: {
      type: "boolean",
      label: "Double optin",
      description: "Whether or not to require the subscriber to confirm subscription via email.",
      optional: true,
    },
    marketingPermissions: {
      type: "boolean",
      label: "Double optin",
      description: "Whether or not the list has marketing permissions (eg. GDPR) enabled.",
      optional: true,
    },

    fields: {
      type: "string[]",
      label: "Fields",
      description: "A string list of fields to return. Reference parameters of sub-objects with dot notation.",
      optional: true,
    },
    excludeFields: {
      type: "string[]",
      label: "Exclude Fields",
      description: "A string list of fields to exclude_fields. Reference parameters of sub-objects with dot notation.",
    },
    listId: {
      type: "string",
      label: "List id",
      description: "The unique ID for the list.",
    },
    includeTotalContacts: {
      type: "boolean",
      label: "Include total contacts?",
      description: "Return the total_contacts field in the stats response, which contains an approximate count of all contacts in any state.",
      optional: true,
    },
  },
  async run({ $ }) {
    const payload = removeNullEntries({
      name: this.name,
      contact: {
        country: this.contactCountry,
        city: this.contactCity,
        address1: this.companyAddress1,
        company: this.companyCompany,
        phone: this.companyPhone,
        zip: this.companyPhone,
        state: this.companyState,
      },
      permission_reminder: this.permissionReminder,
      campaign_defaults: {
        from_name: this.campaignDefaultsFromName,
        from_email: this.campaignDefaultsFromEmail,
        subject: this.campaignDefaultsSubject,
        language: this.campaignDefaultsLanguage,
      },
      email_type_option: this.emailTypeOption,
      use_archive_bar: this.useArchiveBar,
      notify_on_subscribe: this.notifyOnSubscribe,
      notify_on_unsubscribe: this.notifyOnUnsubscribe,
      double_optin: this.doubleOptin,
      marketing_permissions: this.marketingPermissions,
    });
    const response = await this.mailchimp.createList($, payload);
    response && $.export("$summary", "List created");
    console.log(response);
    return response;
  },
};
