const ProfileCard = ({
  name,
  role,
  course,
  rollNo,
  email,
  contact,
  profileImage,
}) => {
  return (
    <div className="rounded-3xl shadow-lg hover:shadow-xl transition-shadow bg-white/90 backdrop-blur">
      <div className="p-7 text-center">
        <div className="w-full max-w-[220px] aspect-square mx-auto mb-5 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-xl text-slate-800">{name}</h3>
        <p className="text-sm text-blue-600 font-medium mt-1">{role}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-600">
          {course && (
            <p>
              <span className="font-medium">Course:</span> {course}
            </p>
          )}
          {rollNo && (
            <p>
              <span className="font-medium">Roll No:</span> {rollNo}
            </p>
          )}
          {email && (
            <p>
              <span className="font-medium">Email:</span> {email}
            </p>
          )}
          {contact && (
            <p>
              <span className="font-medium">Contact:</span> {contact}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
