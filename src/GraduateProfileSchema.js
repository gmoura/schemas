//
// # GraduateProfileSchema
//
// This schema represents the student profile used by our Job Placement team,
// along with the related collection: `GraduateProfileEndorsementSchema`,
// `GraduateProfileProjectSchema` and `GraduateProfileLifeSkillSchema`.
//
// Most of the data is managed by the student themeselves with the exception of:
//
// * `available`
// * `employmentProfile`
// * `englishLevel`
//
// The above listed fields are managed by Laboratoria staff from the cohort
// admin page in the LMS.
//
// Indexes:
//
// * `user`: This is _unique_ index that ensures that each student can only
//   have a single `GraduateProfile`.
// * `employmentProfile`: This is a basic index so that we can efficiently
//   filter documents by this field.
//
// Migration notes:
//
// * `strengthsAndWeaknesses`: Previously known as
//   `aboutMe.highlights.strengthsAndWeaknesses` in the `users` collection.
// * `challenges`: Previously known as `aboutMe.highlights.biggestChallenges`
//    in the `users` collection.
// * `achievements`: Previously known as
//   `aboutMe.highlights.biggestAchievements` in the `users` collection.
// * `interests`: Previously known as `aboutMe.highlights.areaOfInterest` in the
//   `users` collection.
// * `employmentProfile`: Previously known as `recommendedAs` or `recomendedAs`
//    in the `users` collection.
//

module.exports = (conn) => {
  const GraduateProfileSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      unique: true,
    },
    strengthsAndWeaknesses: { type: String, trim: true },
    challenges: { type: String, trim: true },
    achievements: { type: String, trim: true },
    careerGoals: { type: String, trim: true },
    interests: { type: String, trim: true },
    portfolio: { type: String, trim: true }, // ????
    available: { type: Boolean },
    employmentProfile: {
      index: true,
      type: String,
      enum: ['Front-end Developer', 'Prototyper', 'UX Designer'],
    },
    englishLevel: {
      type: String,
      enum: ['basic', 'intermediate', 'advanced'],
    },
  }, { collection: 'graduate_profiles' });

  // GraduateProfileSchema.index({ '$**': 'text' });

  return GraduateProfileSchema;
};
